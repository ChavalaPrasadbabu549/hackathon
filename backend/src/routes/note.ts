import express from "express";
import { createNote, getNotes } from "../controllers/noteController";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/signup", protect, createNote);
router.get("/:candidateId", protect, getNotes);

export default router;
