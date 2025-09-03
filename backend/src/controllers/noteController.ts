import { Request, Response } from "express";
import Note from "../models/Note";
import User from "../models/User";
import Notification from "../models/Notification";

// Create a new note
export const createNote = async (req: any, res: Response) => {
    try {
        const { candidateId, message, mentions = [] } = req.body;

        if (!candidateId || !message) {
            return res.status(400).json({ message: "Candidate ID and message are required" });
        }

        const mentionedUsers = await User.find({ _id: { $in: mentions } }).select("_id name email");

        // Create note
        const note = await Note.create({
            candidate: candidateId,
            user: req.user._id,
            message,
            mentions: mentionedUsers.map(u => u._id),
        });

        // Create notifications for mentioned users
        for (const user of mentionedUsers) {
            await Notification.create({
                userId: user._id,
                candidateId,
                noteId: note._id,
                messagePreview: message,
            });
        }

        res.status(201).json({ note });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Get notes for a candidate
export const getNotes = async (req: Request, res: Response) => {
    try {
        const { candidateId } = req.params;

        const notes = await Note.find({ candidate: candidateId })
            .populate("user", "name email")
            .populate("candidate", "name email")
            .populate("mentions", "name email")
            .sort({ createdAt: -1 });

        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
