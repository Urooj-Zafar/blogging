import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    setCategories(res.data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete category?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold">
          Manage Categories
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

          <button
            onClick={() => navigate("/createCategories")}
            className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 w-full sm:w-auto"
          >
            Add Category
          </button>

          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 w-full sm:w-auto"
          >
            Dashboard
          </button>

        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow">

        {categories.length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            No categories found.
          </p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 border-b"
            >
              <h2 className="font-semibold text-lg break-words">
                {cat.name}
              </h2>

              <div className="flex gap-4 self-end sm:self-auto">

                <MdModeEdit
                  className="cursor-pointer text-2xl text-blue-600 hover:text-blue-800"
                  onClick={() =>
                    navigate(`/createCategories/${cat._id}`)
                  }
                />

                <MdDelete
                  className="cursor-pointer text-2xl text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(cat._id)}
                />

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}