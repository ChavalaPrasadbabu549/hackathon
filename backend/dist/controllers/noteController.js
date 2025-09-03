"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotes = exports.createNote = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const User_1 = __importDefault(require("../models/User"));
const Notification_1 = __importDefault(require("../models/Notification"));
// Create a new note
const createNote = async (req, res) => {
    try {
        const { candidateId, message, mentions = [] } = req.body;
        if (!candidateId || !message) {
            return res.status(400).json({ message: "Candidate ID and message are required" });
        }
        const mentionedUsers = await User_1.default.find({ _id: { $in: mentions } }).select("_id name email");
        // Create note
        const note = await Note_1.default.create({
            candidate: candidateId,
            user: req.user._id,
            message,
            mentions: mentionedUsers.map(u => u._id),
        });
        // Create notifications for mentioned users
        for (const user of mentionedUsers) {
            await Notification_1.default.create({
                userId: user._id,
                candidateId,
                noteId: note._id,
                messagePreview: message,
            });
        }
        res.status(201).json({ note });
    }
    catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.createNote = createNote;
// Get notes for a candidate
const getNotes = async (req, res) => {
    try {
        const { candidateId } = req.params;
        const notes = await Note_1.default.find({ candidate: candidateId })
            .populate("user", "name email")
            .populate("candidate", "name email")
            .populate("mentions", "name email")
            .sort({ createdAt: -1 });
        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getNotes = getNotes;
