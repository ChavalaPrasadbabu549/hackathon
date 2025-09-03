"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user
        const user = await User_1.default.create({ name, email, password });
        await user.save();
        return res.status(201).json({ success: true, message: 'Your account has been registered successfully', data: user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // validate password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        // ✅ use your generateToken util
        const token = (0, generateToken_1.default)(user.id.toString());
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                name: user.name,
                email: user.email,
                token,
            },
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
exports.loginUser = loginUser;
// @desc    Get all getAllUsers 
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().sort({ createdAt: -1 }).select("-password"); // exclude password
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users,
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching users",
            error: error.message,
        });
    }
};
exports.getAllUsers = getAllUsers;
