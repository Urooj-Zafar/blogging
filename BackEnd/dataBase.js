import mongoose from "mongoose";

export default async function dataBase() {
  try {
    const DB = process.env.MONGODB;

    if (!DB) {
      throw new Error("MONGODB environment variable is not defined");
    }

    await mongoose.connect(DB);

    console.log("Database connected.");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    throw e;
  }
}