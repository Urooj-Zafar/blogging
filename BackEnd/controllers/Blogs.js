import mongoose from "mongoose";
import Blogs from "../models/Blogs.js";
import Categories from "../models/Categories.js";
import cloudinary from "../config/cloudinary.js";

const isValidObjectId = (id) =>
  mongoose.Types.ObjectId.isValid(id);

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "braincrafters/blogs",
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


export async function getAllBlogs(req, res) {
  try {
    const data = await Blogs.find()
      .populate("category", "name")
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    const blogs = data.map((blog) => ({
      ...blog._doc,
      date: new Date(blog.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    return res.status(200).json({
      status: true,
      message: "All blogs fetched",
      data: blogs,
    });
  } catch (e) {
    console.error("getAllBlogs error:", e);

    return res.status(500).json({
      status: false,
      message: "Server error in getAllBlogs",
    });
  }
}


export async function getOneBlog(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid blog ID",
      });
    }

    const blog = await Blogs.findById(id)
      .populate("category", "name")
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Single blog fetched",
      data: blog,
    });
  } catch (e) {
    console.error("getOneBlog error:", e);

    return res.status(500).json({
      status: false,
      message: "Server error in getOneBlog",
    });
  }
}


export async function getBlogsByCategory(req, res) {
  try {
    const { categoryId } = req.params;

    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid category ID",
      });
    }

    const blogs = await Blogs.find({ category: categoryId })
      .populate("category", "name")
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    if (!blogs.length) {
      return res.status(404).json({
        status: false,
        message: "No blogs found for this category",
      });
    }

    return res.status(200).json({
      status: true,
      count: blogs.length,
      blogs,
    });
  } catch (e) {
    console.error("getBlogsByCategory error:", e);

    return res.status(500).json({
      status: false,
      message: "Server error while fetching blogs by category",
    });
  }
}


export async function createBlog(req, res) {
  try {
    const {
      title,
      description,
      content,
      category,
      author,
    } = req.body;

    if (
      !title ||
      !description ||
      !content ||
      !category ||
      !author
    ) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    if (!isValidObjectId(category)) {
      return res.status(400).json({
        status: false,
        message: "Invalid category ID",
      });
    }

    if (!isValidObjectId(author)) {
      return res.status(400).json({
        status: false,
        message: "Invalid author ID",
      });
    }

    const categoryDoc = await Categories.findById(category);

    if (!categoryDoc) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    let imageUrl = req.body.image || null;

    // Upload image to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const newBlog = await Blogs.create({
      title,
      description,
      content,
      category: categoryDoc._id,
      author,
      image: imageUrl,
    });

    return res.status(201).json({
      status: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (err) {
    console.error("createBlog error:", err);

    return res.status(500).json({
      status: false,
      message: "Server error creating blog",
      error: err.message,
    });
  }
}


export async function updateBlog(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid blog ID",
      });
    }

    const blog = await Blogs.findById(id);

    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    const {
      title,
      description,
      content,
      category,
    } = req.body;

    let imageUrl = req.body.image || blog.image;

    // Upload new image to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    if (category) {
      if (!isValidObjectId(category)) {
        return res.status(400).json({
          status: false,
          message: "Invalid category ID",
        });
      }

      const categoryDoc = await Categories.findById(category);

      if (!categoryDoc) {
        return res.status(404).json({
          status: false,
          message: "Category not found",
        });
      }

      blog.category = categoryDoc._id;
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.content = content || blog.content;
    blog.image = imageUrl;

    await blog.save();

    return res.status(200).json({
      status: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (e) {
    console.error("updateBlog error:", e);

    return res.status(500).json({
      status: false,
      message: "Server error in updateBlog",
    });
  }
}


export async function deleteBlog(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid blog ID",
      });
    }

    const data = await Blogs.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Blog deleted successfully",
      data,
    });
  } catch (e) {
    console.error("deleteBlog error:", e);

    return res.status(500).json({
      status: false,
      message: "Server error in deleteBlog",
    });
  }
}
