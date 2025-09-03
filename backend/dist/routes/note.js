"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/signup", auth_1.protect, noteController_1.createNote);
router.get("/:candidateId", auth_1.protect, noteController_1.getNotes);
exports.default = router;
