import Categories from "../models/Categories.js";

async function getAllCategories(req, res) {
  try {
    const categories = await Categories.find().sort({ name: 1 });
    return res.status(200).json({ status: true, data: categories });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error fetching categories" });
  }
}

async function getOneCategory(req, res) {
  try {
    const { id } = req.params;
    const data = await Categories.findById(id);
    return res.status(200).json({ status: true, data });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: false, message: "Server error in getOneCategory" });
  }
}

async function createCategory(req, res) {
  try {
    const { name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const category = await Categories.create({ name, image });

    return res.status(200).json({ status: true, message: "Category created successfully", data: category });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: false, message: "Server error in createCategory" });
  }
}

async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedCategory = await Categories.findByIdAndUpdate(
      id,
      { ...(name && { name }), ...(image && { image }) },
      { new: true }
    );

    return res.status(200).json({ status: true, message: "Category updated successfully", data: updatedCategory });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: false, message: "Server error in updateCategory" });
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const deletedCategory = await Categories.findByIdAndDelete(id);

    return res.status(200).json({ status: true, message: "Category deleted successfully", data: deletedCategory });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: false, message: "Server error in deleteCategory" });
  }
}

export {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
