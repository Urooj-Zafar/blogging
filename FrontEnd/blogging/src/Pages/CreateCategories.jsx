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
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  // Fetch category if editing
  useEffect(() => {
    if (!isEdit) return;

    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/categories/${id}`);
        // Only allow author to edit
        if (res.data.data.author._id !== user._id) {
          alert("You are not authorized to edit this category!");
          navigate("/categories");
          return;
        }
        setName(res.data.data.name);
      } catch (err) {
        console.error(err);
        setError("Failed to load category");
      }
    };

    fetchCategory();
  }, [id, isEdit, navigate, user._id]);

  const handleSubmit = async () => {
    if (!name) return setError("Category name required");

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      if (isEdit) {
        await axios.put(
          `http://localhost:3000/categories/${id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Category updated!");
      } else {
        await axios.post(
          "http://localhost:3000/categories",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Category created!");
      }

      navigate("/categories");
    } catch (err) {
      console.error(err);
      setError("Category submission failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-10 bg-white rounded shadow-xl">
      <h2 className="text-xl font-bold mb-3 text-center">
        {isEdit ? "Edit Category" : "Create Category"}
      </h2>

      {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

      <input
        className="border p-2 w-full mb-3"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="file"
        className="mb-3"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        onClick={handleSubmit}
        className="bg-black hover:bg-orange-500 text-white w-full py-2 rounded"
      >
        {isEdit ? "Update Category" : "Create Category"}
      </button>
    </div>
  );
}