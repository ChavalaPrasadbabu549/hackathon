"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsRead = exports.getNotifications = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
// Get all notifications for the current user
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification_1.default.find({ userId: req.user._id })
            .populate("candidateId", "name")
            .populate("messageId", "message")
            .sort({ createdAt: -1 });
        res.json(notifications);
    }
    catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getNotifications = getNotifications;
// Mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const userId = req.user._id;
        const noteId = req.params.noteId;
        const notification = await Notification_1.default.findOne({ userId, noteId });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        notification.isRead = true;
        await notification.save();
        res.json(notification);
    }
    catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.markAsRead = markAsRead;
