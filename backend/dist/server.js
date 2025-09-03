"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./config/db"));
const candidate_1 = __importDefault(require("./routes/candidate"));
const user_1 = __importDefault(require("./routes/user"));
const note_1 = __importDefault(require("./routes/note"));
const notification_1 = __importDefault(require("./routes/notification"));
const socket_1 = require("./utils/socket");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/user", user_1.default);
app.use("/candidates", candidate_1.default);
app.use("/notes", note_1.default);
app.use("/notifications", notification_1.default);
// Socket.io
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173", // your frontend
        methods: ["GET", "POST", "PUT", "PATCH"],
        credentials: true,
    },
});
(0, socket_1.initSocket)(io);
const PORT = process.env.PORT || 5002;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
