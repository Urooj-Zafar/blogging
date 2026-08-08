import express from "express";
import upload from "../middleware/upload.js";
import {
  register,
  login,
  getAllUsers,
  deleteUser,
  verifyOTP,
  resendOTP,
  updateProfile
} from "../controllers/Users.js";


const router = express.Router();

router.get("/", getAllUsers);

router.post("/register", register);

router.post("/login", login);

router.post("/verify-otp", verifyOTP);

router.post("/resend-otp", resendOTP);

router.delete("/:id", deleteUser);

router.put("/profile/:id",upload.single("profileImage"),updateProfile);

export default router;