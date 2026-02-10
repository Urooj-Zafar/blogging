import express from "express";
import cors from "cors";
import dataBase from "./dataBase.js";
import path from "path";
import UsersRoutes from "./routes/Users.js";
import BlogsRoutes from "./routes/Blogs.js";
import CategoriesRoutes from "./routes/Categories.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());



app.listen(3000, () => {
    console.log("server running");
});

dataBase();

app.use(cors());
app.use("/users",UsersRoutes);
app.use("/blogs",BlogsRoutes);
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/categories",CategoriesRoutes);