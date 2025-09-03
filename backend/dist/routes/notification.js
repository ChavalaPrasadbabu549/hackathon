"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationController_1 = require("../controllers/notificationController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/getall", auth_1.protect, notificationController_1.getNotifications);
router.patch("/:noteId/read", auth_1.protect, notificationController_1.markAsRead);
exports.default = router;
