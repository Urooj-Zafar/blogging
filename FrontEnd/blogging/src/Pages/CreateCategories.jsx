import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute";

export default function CreateCategoryWrapper() {
  const isLogin = !!localStorage.getItem("token");

  return (
    <ProtectedRoute isLogin={isLogin}>
      <CreateCategory />
    </ProtectedRoute>
  );
}

function CreateCategory() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(isEdit);

  // Fetch existing category when editing
  useEffect(() => {
    if (!isEdit) return;

    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories/${id}`
        );

        const category = res.data.data;

        setName(category.name || "");
        setExistingImage(category.image || "");
      } catch (err) {
        console.error("Error loading category:", err);
        setError("Failed to load category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, isEdit]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      return setError("Category name required");
    }

    try {
      const formData = new FormData();

      formData.append("name", name);

      if (image) {
        formData.append("image", image);
      }

      if (isEdit) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/categories/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Category updated!");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/categories`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Category created!");
      }

      navigate("/categories");
    } catch (err) {
      console.error(err);
      setError("Category submission failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="max-w-md mx-auto mt-10 p-10 rounded shadow-xl bg-white">

        <h2 className="text-xl font-bold mb-3 text-center">
          {isEdit ? "Edit Category" : "Create Category"}
        </h2>

        {error && (
          <p className="text-red-500 mb-3 text-center">
            {error}
          </p>
        )}

        {/* Category Name */}
        <input
          className="border p-2 w-full mb-3"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Existing Image */}
        {isEdit && existingImage && (
          <div className="mb-4">
            <p className="font-semibold mb-2">
              Current Image
            </p>

            <img
              src={existingImage}
              alt={name}
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}

        {/* New Image */}
        <input
          type="file"
          accept="image/*"
          className="mb-3"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* New Image Preview */}
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="New category"
            className="w-full h-48 object-cover rounded mb-3"
          />
        )}

        <button
          onClick={handleSubmit}
          className="bg-black hover:bg-orange-500 text-white w-full py-2 rounded"
        >
          {isEdit ? "Update Category" : "Create Category"}
        </button>
      </div>
    </div>
  );
}