import { Server } from "socket.io";
import Note from "../models/Note";
import User from "../models/User";
import Notification from "../models/Notification";

export const initSocket = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("joinCandidate", (candidateId) => {
            socket.join(candidateId);
        });

        socket.on("sendNote", async (data) => {
            try {
                const { candidateId, userId, message } = data;

                // Extract mentions from message
                const mentionedUsernames: string[] = message.match(/@(\w+)/g)?.map((u: string) => u.slice(1)) || [];

                // Case-insensitive search for users in DB
                const mentionedUsers = await User.find({ name: { $in: mentionedUsernames.map(u => new RegExp(`^${u}$`, "i")) } }).select("_id name email");

                const note = await Note.create({
                    candidate: candidateId,
                    user: userId,
                    message,
                    mentions: mentionedUsers.map(u => u),
                });

                for (const user of mentionedUsers) {
                    await Notification.create({
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
            } catch (error) {
                console.error("Socket sendNote error:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
};
