import express from "express";
console.log("INSIDE USER ROUTE");
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebars } from "../controllers/userController.js";
const router = express.Router();

router.get("/", protectRoute, getUsersForSidebars) // GET all users

export default router;