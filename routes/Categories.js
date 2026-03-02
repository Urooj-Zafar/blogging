import express from "express";
import multer from "multer";
import path from "path";
import {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/Categories.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", getAllCategories);

router.get("/:id", getOneCategory);

router.post("/", upload.single("image"), createCategory);

router.put("/:id", upload.single("image"), updateCategory);

router.delete("/:id", deleteCategory);

export default router;
