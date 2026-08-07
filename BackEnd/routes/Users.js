import express from "express";
import {
  register,
  login,
  getAllUsers,
  deleteUser,
  verifyOTP,
  resendOTP
} from "../controllers/Users.js";


const router = express.Router();

router.get("/", getAllUsers);

router.post("/register", register);

router.post("/login", login);

router.post("/verify-otp", verifyOTP);

router.post("/resend-otp", resendOTP);

router.delete("/:id", deleteUser);


export default router;