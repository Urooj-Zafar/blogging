import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateCategory() {
  const { id } = useParams(); // 🔥 category id
  const isEdit = Boolean(id);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* ---------------- FETCH CATEGORY IF EDIT ---------------- */
  useEffect(() => {
    if (!isEdit) return;

    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/categories/${id}`);
        setName(res.data.data.name);
      } catch (err) {
        console.error(err);
        setError("Failed to load category");
      }
    };

    fetchCategory();
  }, [id, isEdit]);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (!name) return setError("Category name required");

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      if (isEdit) {
        await axios.put(
          `http://localhost:3000/categories/${id}`,
          formData
        );
        alert("Category updated!");
      } else {
        await axios.post(
          "http://localhost:3000/categories",
          formData
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
