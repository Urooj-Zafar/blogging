import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
    },

    role: {
      type: String,
      enum: ["reader", "author", "admin"],
      default: "reader",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    profileImage: {
    type: String,
    default: "/uploads/default-profile.png",
    },
    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", userSchema);