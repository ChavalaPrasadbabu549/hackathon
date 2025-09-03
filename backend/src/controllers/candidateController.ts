import { Request, Response } from "express";
import Candidate from "../models/Candidate";

// @desc    Create new candidate
export const createCandidate = async (req: any, res: Response) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        const candidateExists = await Candidate.findOne({ email });
        if (candidateExists) {
            return res.status(400).json({ message: "Candidate already exists" });
        }

        const candidate = await Candidate.create({ name, email, createdBy: req.user._id });
        res.status(201).json({
            message: "Candidate added successfully",
            candidate,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @desc Get all candidates
export const getAllCandidates = async (req: any, res: Response) => {
    try {
        const candidates = await Candidate.find({ createdBy: req.user._id })
            .sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            message: "Candidates fetched successfully",
            candidates,
        });
    } catch (error: any) {
        console.error("Error fetching candidates:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching candidates",
            error: error.message,
        });
    }
};
