import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const userExists = await Users.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.create({
      name,
      email,
      password: hashedPassword,
      role: "author",
    });

    return res.status(201).json({
      status: true,
      message: "User registered successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: false,
      message: "Server error in register",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: false,
      message: "Server error in login",
    });
  }
}

export { register, login };
