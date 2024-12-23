import jwt from "jsonwebtoken"
import User from "../models/userModel.js";

/** @type {import("express").RequestHandler} */
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("token in Protect route file", token);
        if (!token) {
            console.log("Shiiittt");
            return res.status(401).json({ error: 'Unauthorized - No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
        }
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in ProtectRoute middleware: ", error.message);
        res.status(500).json({ message: `Error in ProtectRoute middleware: ${error.message}` });
    }
}
export default protectRoute