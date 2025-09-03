import express from "express";
import { getNotifications, markAsRead } from "../controllers/notificationController";
import { protect } from "../middleware/auth";

const router = express.Router();


router.get("/getall", protect, getNotifications);
router.patch("/:noteId/read", protect, markAsRead);

export default router;
