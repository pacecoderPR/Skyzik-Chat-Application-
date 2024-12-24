import path from "path"
import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connectMongo from "./db/connectDB.js";
import authRoutes from "./routes/authroutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors"
import { app, server } from "./socket/socket.js"

dotenv.config();
const port = process.env.PORT || 3000;
const __dirname = path.resolve()
const corsOptions = {
    origin: [
        "https://skyzik-chat-application.vercel.app",
         "https://skyzik-chat-application-o1a45vfoz-pritesh-rajpurohits-projects.vercel.app" // Replace with your actual frontend URL
    ],
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));
app.use(express.json()); //  Middleware for parsing JSON bodies
app.use(cookieParser()) // Adds middleware that parses cookies and exposes them on req.cookies


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"))
})

server.listen(port, () => {
    connectMongo();
    console.log(`Server is running on port ${port}`);
});