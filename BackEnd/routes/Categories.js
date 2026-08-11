import express from "express";

import {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/Categories.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllCategories);

router.get("/:id", getOneCategory);

router.post(
  "/",
  upload.single("image"),
  createCategory
);

router.put(
  "/:id",
  upload.single("image"),
  updateCategory
);

router.delete(
  "/:id",
  deleteCategory
);

export default router;

