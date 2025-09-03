import express from "express";
import { createCandidate, getAllCandidates } from "../controllers/candidateController";
import { protect } from "../middleware/auth";

const router = express.Router();

// Protected routes (require login)
router.post("/signup", protect, createCandidate);
router.get("/getall", protect, getAllCandidates);

export default router;
