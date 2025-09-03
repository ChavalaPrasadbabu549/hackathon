"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCandidates = exports.createCandidate = void 0;
const Candidate_1 = __importDefault(require("../models/Candidate"));
// @desc    Create new candidate
const createCandidate = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        const candidateExists = await Candidate_1.default.findOne({ email });
        if (candidateExists) {
            return res.status(400).json({ message: "Candidate already exists" });
        }
        const candidate = await Candidate_1.default.create({ name, email, createdBy: req.user._id });
        res.status(201).json({
            message: "Candidate added successfully",
            candidate,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.createCandidate = createCandidate;
// @desc Get all candidates
const getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate_1.default.find({ createdBy: req.user._id })
            .sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: "Candidates fetched successfully",
            candidates,
        });
    }
    catch (error) {
        console.error("Error fetching candidates:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching candidates",
            error: error.message,
        });
    }
};
exports.getAllCandidates = getAllCandidates;
