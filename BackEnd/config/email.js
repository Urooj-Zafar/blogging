import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "braincrafter.blog@gmail.com",
    pass: "takw mjcp yikl xpag"
  }
});

export default transporter;