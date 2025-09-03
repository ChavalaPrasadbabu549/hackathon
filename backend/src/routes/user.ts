import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getall", getAllUsers);

export default router;
