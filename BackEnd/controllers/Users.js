import Users from "../models/Users.js";
import transporter from "../config/email.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "braincrafters/profiles",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer);
  });
};


async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await Users.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await Users.create({
      name,
      email,
      password: hashedPassword,
      role: role || "author",
      isVerified: false,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000,
    });

    await transporter.sendMail({
      from: '"BrainCrafters" <braincrafter.blog@gmail.com>',
      to: email,
      subject: "BrainCrafters Email Verification",
      html: `
        <h2>Welcome to BrainCrafters</h2>

        <p>Your verification code is:</p>

        <h1 style="color:#f97316;letter-spacing:5px;">
          ${otp}
        </h1>

        <p>This OTP expires in <b>10 minutes</b>.</p>

        <p>If you did not create this account, ignore this email.</p>
      `,
    });

    return res.status(201).json({
      status: true,
      message: "OTP sent successfully.",
      email,
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

    if (!user.isVerified) {
      return res.status(401).json({
        status: false,
        message: "Please verify your email first.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
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
        profileImage: user.profileImage,
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


export async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        status: false,
        message: "Account already verified",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        status: false,
        message: "OTP expired",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json({
      status: true,
      message: "Account verified successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
}


export async function resendOTP(req, res) {
  try {
    const { email } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        status: false,
        message: "Account already verified",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    await transporter.sendMail({
      from: '"BrainCrafters" <braincrafter.blog@gmail.com>',
      to: email,
      subject: "BrainCrafters OTP Verification",
      html: `
        <h2>Your New OTP</h2>

        <h1 style="color:#f97316;letter-spacing:5px;">
          ${otp}
        </h1>

        <p>This OTP expires in <b>10 minutes</b>.</p>
      `,
    });

    return res.status(200).json({
      status: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
}


export async function getAllUsers(req, res) {
  try {
    const users = await Users.find()
      .select("-password");

    return res.status(200).json({
      status: true,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
}


export async function updateProfile(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Check if new email already belongs to another user
    if (email && email !== user.email) {
      const emailExists = await Users.findOne({
        email,
        _id: { $ne: id },
      });

      if (emailExists) {
        return res.status(400).json({
          status: false,
          message: "Email is already in use",
        });
      }

      user.email = email;
    }

    // Update name
    if (name && name.trim() !== "") {
      user.name = name.trim();
    }

    // Update password
    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(password, 10);
    }

    // Upload profile image to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer
      );

      user.profileImage = result.secure_url;
    }

    await user.save();

    return res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.log("Update profile error:", err);

    return res.status(500).json({
      status: false,
      message: "Server error while updating profile",
    });
  }
}


export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        status: false,
        message: "Admin account cannot be deleted",
      });
    }

    await Users.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
}


export { register, login };

