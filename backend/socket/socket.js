import { Server } from "socket.io";
import http from 'http';
import express from 'express'

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://skyzik-chat-application.vercel.app",
             "https://skyzik-chat-application-o1a45vfoz-pritesh-rajpurohits-projects.vercel.app"
        ],
        methods: ["GET", "POST"],
        credentials:true
    }
})

// instant message
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {};
io.on('connection', (socket) => {
    // console.log("user connected: ", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") {
        userSocketMap[userId] = socket.id;
    }
    // io.emit() to send event to all users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on('disconnect', () => {
        // console.log("user disconnected: ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

    })
})



export { app, io, server };