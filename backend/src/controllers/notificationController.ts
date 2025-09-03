import { Request, Response } from "express";
import Notification from "../models/Notification";


// Get all notifications for the current user
export const getNotifications = async (req: any, res: Response) => {
    try {
        const notifications = await Notification.find({ userId: req.user._id })
            .populate("candidateId", "name")
            .populate("messageId", "message")
            .sort({ createdAt: -1 });

        res.json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Mark a notification as read
export const markAsRead = async (req: any, res: Response) => {
    try {
        const userId = req.user._id;    
        const noteId = req.params.noteId; 

        const notification = await Notification.findOne({ userId, noteId });

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        notification.isRead = true;
        await notification.save();

        res.json(notification);
    } catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ message: "Server error", error });
    }
};



