import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      setBlogs(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs((prev) => prev.filter((blog) => blog._id !== id));

      alert("Blog deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
      Manage Blogs
    </h1>

    <button
      onClick={() => navigate("/admin")}
      className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 w-full sm:w-auto"
    >
      Dashboard
    </button>
  </div>

  <div className="bg-white rounded-xl shadow overflow-hidden">

  <div className="hidden md:grid grid-cols-12 bg-orange-500 text-white font-semibold p-4">
    <div className="col-span-2">Image</div>
    <div className="col-span-7">Title</div>
    <div className="col-span-3 text-center">Actions</div>
  </div>

  {blogs.map((blog) => (
    <div
      key={blog._id}
      className="group border-b p-4 hover:bg-gray-50 transition"
    >

      <div className="grid grid-cols-12 items-center gap-4">

        <div className="col-span-3 md:col-span-2">
          <img
            src={
              blog.image ||"/default.jpg"
            }
            alt={blog.title}
            className="w-20 h-16 rounded object-cover"
          />
        </div>

        <div className="col-span-6 md:col-span-7">
          <h3 className="font-semibold text-lg">
            {blog.title}
          </h3>
        </div>

        <div className="col-span-3 flex justify-end gap-3">
          <MdModeEditOutline
            size={22}
            className="cursor-pointer text-blue-600 hover:text-blue-800"
            onClick={() => navigate(`/createblog/${blog._id}`)}
          />

          <MdDelete
            size={22}
            className="cursor-pointer text-red-600 hover:text-red-800"
            onClick={() => handleDelete(blog._id)}
          />
        </div>
      </div>

      <div className="mt-3 hidden group-hover:block md:block text-sm text-gray-600">
        <p><span className="font-semibold">Category:</span> {blog.category?.name}</p>
        <p><span className="font-semibold">Author:</span> {blog.author?.name}</p>
        <p><span className="font-semibold">Date:</span> {blog.date}</p>
      </div>
    </div>
  ))}
</div>
</div>
  );
}