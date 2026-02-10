import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/categories/${id}`
        );
        setName(res.data.data.name);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to load category");
      }
    };
    fetchCategory();
  }, [id]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      await axios.put(
        `http://localhost:3000/categories/${id}`,
        formData
      );
      alert("Category updated!");
      navigate("/categories");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Edit Category</h2>

      <input
        className="border p-2 w-full mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="file"
        className="mb-3"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          className="bg-black hover:bg-orange-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>

        <button
          onClick={() => navigate("/categories")}
          className="bg-gray-500 hover:bg-orange-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
