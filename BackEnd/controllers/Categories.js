import Categories from "../models/Categories.js";
import cloudinary from "../config/cloudinary.js";

// Upload image buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "braincrafters/categories",
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


async function getAllCategories(req, res) {
  try {
    const categories = await Categories.find().sort({ name: 1 });

    return res.status(200).json({
      status: true,
      data: categories,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      status: false,
      message: "Server error fetching categories",
    });
  }
}


async function getOneCategory(req, res) {
  try {
    const { id } = req.params;

    const data = await Categories.findById(id);

    return res.status(200).json({
      status: true,
      data,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      status: false,
      message: "Server error in getOneCategory",
    });
  }
}


async function createCategory(req, res) {
  try {
    const { name } = req.body;

    let imageUrl;

    // Upload category image to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const category = await Categories.create({
      name,
      image: imageUrl,
    });

    return res.status(200).json({
      status: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (e) {
    console.log("createCategory error:", e);

    return res.status(500).json({
      status: false,
      message: "Server error in createCategory",
    });
  }
}


async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updateData = {};

    if (name) {
      updateData.name = name;
    }

    // Upload new category image to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      updateData.image = result.secure_url;
    }

    const updatedCategory = await Categories.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (e) {
    console.log("updateCategory error:", e);

    return res.status(500).json({
      status: false,
      message: "Server error in updateCategory",
    });
  }
}


async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    const deletedCategory =
      await Categories.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (e) {
    console.log("deleteCategory error:", e);

    return res.status(500).json({
      status: false,
      message: "Server error in deleteCategory",
    });
  }
}


export {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
