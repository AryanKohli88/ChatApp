import express from "express";
const router = express.Router();

// Two ways to import functions exported in different manners in Javascript
import { sendMessage } from "../controllers/messageController.js"; 
import { getMessages } from "../controllers/messageController.js"; 
import protectRoute  from "../middleware/protectRoute.js";

router.get("/:id", protectRoute , getMessages)
router.post("/send/:id", protectRoute , sendMessage)

export default router;