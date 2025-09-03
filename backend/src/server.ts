import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db";
import candidateRoutes from "./routes/candidate";
import userRoutes from "./routes/user";
import noteRoutes from "./routes/note";
import notificationRoutes from "./routes/notification";
import { initSocket } from "./utils/socket";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/candidates", candidateRoutes);
app.use("/notes", noteRoutes);
app.use("/notifications", notificationRoutes);



// Socket.io
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // your frontend
        methods: ["GET", "POST", "PUT", "PATCH"],
        credentials: true,
    },
});


initSocket(io);

const PORT = process.env.PORT || 5002;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
