import express from "express";
import multer from "multer";
import {
  getAllBlogs,
  getOneBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsByCategory,
} from "../controllers/Blogs.js";

const upload = multer({ dest: "uploads/" }); // multer storage

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/category/:categoryId", getBlogsByCategory);
router.get("/:id", getOneBlog);

router.post("/", upload.single("image"), createBlog);

router.put("/:id", upload.single("image"), updateBlog);

router.delete("/:id", deleteBlog);

export default router;
