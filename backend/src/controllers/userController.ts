import { Request, Response } from "express";
import User from "../models/User";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user
        const user = await User.create({ name, email, password });
        await user.save();
        return res.status(201).json({ success: true, message: 'Your account has been registered successfully', data: user });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // validate password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // ✅ use your generateToken util
        const token = generateToken(user.id.toString());

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                name: user.name,
                email: user.email,
                token,
            },
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// @desc    Get all getAllUsers 
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().sort({ createdAt: -1 }).select("-password"); // exclude password
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users,
        });
    } catch (error: any) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching users",
            error: error.message,
        });
    }
};

