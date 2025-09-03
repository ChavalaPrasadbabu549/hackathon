"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const User_1 = __importDefault(require("../models/User"));
const Notification_1 = __importDefault(require("../models/Notification"));
const initSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("joinCandidate", (candidateId) => {
            socket.join(candidateId);
        });
        socket.on("sendNote", async (data) => {
            try {
                const { candidateId, userId, message } = data;
                // Extract mentions from message
                const mentionedUsernames = message.match(/@(\w+)/g)?.map((u) => u.slice(1)) || [];
                // Case-insensitive search for users in DB
                const mentionedUsers = await User_1.default.find({ name: { $in: mentionedUsernames.map(u => new RegExp(`^${u}$`, "i")) } }).select("_id name email");
                const note = await Note_1.default.create({
                    candidate: candidateId,
                    user: userId,
                    message,
                    mentions: mentionedUsers.map(u => u),
                });
                for (const user of mentionedUsers) {
                    await Notification_1.default.create({
                        userId: user._id,
                        candidateId,
                        messageId: note._id,
                        messagePreview: message,
                    });
                }
                io.to(candidateId).emit("receiveNote", {
                    note,
                    mentions: mentionedUsers.map((u) => ({ _id: u._id, name: u.name })),
                });
            }
            catch (error) {
                console.error("Socket sendNote error:", error);
            }
        });
        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
};
exports.initSocket = initSocket;
