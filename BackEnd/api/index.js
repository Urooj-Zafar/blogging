import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import dataBase from "../dataBase.js";

const app = express();

app.use(cors());
app.use(express.json());


await dataBase();


app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

const UsersRoutes = (await import("../routes/Users.js")).default;
const BlogsRoutes = (await import("../routes/Blogs.js")).default;
const CategoriesRoutes = (await import("../routes/Categories.js")).default;

app.use("/users", UsersRoutes);
app.use("/blogs", BlogsRoutes);
app.use("/categories", CategoriesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;