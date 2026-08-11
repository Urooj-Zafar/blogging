import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
      setCategories(res.data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleCreate = async () => {
    if (!name) return alert("Category name is required");

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/categories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Category created!");
      setName("");
      setImage(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to create category");
    }
  };

  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setName(cat.name);
    setImage(null);
  };

  const handleUpdate = async () => {
    if (!selectedCategory) return;
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/categories/${selectedCategory._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Category updated!");
      setSelectedCategory(null);
      setName("");
      setImage(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`);
      alert("Category deleted!");
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Categories</h1>

      {/* Create / Edit Form */}
      <div className="max-w-md mx-auto mb-6 p-4 bg-gray-100 rounded shadow">
        <h2 className="text-2xl font-bold mb-3">
          {selectedCategory ? "Edit Category" : "Create Category"}
        </h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="border p-2 rounded w-full mb-3"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-3"
        />

        {selectedCategory ? (
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={() => setSelectedCategory(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Create
          </button>
        )}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat._id} className="bg-white p-4 rounded shadow relative">
            <img
              src={cat.image ? `${import.meta.env.VITE_API_URL}${cat.image}` : "/default.jpg"}
              alt={cat.name}
              className="h-32 w-full object-cover mb-2 rounded"
            />
            <h3 className="text-center font-semibold">{cat.name}</h3>

            {/* Edit & Delete icons */}
            <div className="absolute top-2 right-2 flex gap-2">
              <FaEdit
                className="cursor-pointer text-blue-500 hover:text-blue-700"
                size={18}
                onClick={() => handleEdit(cat)}
              />
              <FaTrash
                className="cursor-pointer text-red-500 hover:text-red-700"
                size={18}
                onClick={() => handleDelete(cat._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
