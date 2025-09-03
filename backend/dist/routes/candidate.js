"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const candidateController_1 = require("../controllers/candidateController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Protected routes (require login)
router.post("/signup", auth_1.protect, candidateController_1.createCandidate);
router.get("/getall", auth_1.protect, candidateController_1.getAllCandidates);
exports.default = router;
