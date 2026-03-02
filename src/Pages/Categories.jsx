import { useState, useEffect } from "react";
import BlogCard from "../Components/BlogCard";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/categories");
        setCategories(res.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);


  

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this category?")) return;

  try {
    await axios.delete(`http://localhost:3000/categories/${id}`);
    toast.success("You deleted Category Successfully!");
    window.location.reload();
  } catch (err) {
    console.error(err.response || err);
    alert("Delete failed");
  }
};


  // Fetch blogs when a category is selected
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/blogs");
        const filtered = res.data.data.filter(
          (b) => b.category?.name === selectedCategory
        );
        setBlogs(filtered);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs([]);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-black text-white text-center py-20 px-4 w-full">
        <h1 className="text-5xl font-bold mb-6">Blog Categories</h1>

        <button
    onClick={() => navigate("/createCategories")}
    className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
  >
    Create Category
  </button>
      </section>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`cursor-pointer flex flex-col justify-center items-center p-6 rounded-xl shadow-md transition transform hover:-translate-y-1 duration-300
              ${selectedCategory === cat.name ? "bg-orange-500 text-white" : "bg-white text-gray-800"}
            `}
          >
            <img
              src={cat.image ? `http://localhost:3000${cat.image}` : "/default.jpg"}
              alt={cat.name}
              className="h-32 w-32 mb-4 rounded-full object-cover"
            />
            <span className="text-lg font-semibold">{cat.name}</span>
            <div className="absolute top-2 right-2 flex gap-2">
                    <MdModeEditOutline
                    size={18}className="cursor-pointer text-black"
                    onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/createCategories/${cat._id}`);
                    }}
                    />

                    <MdDelete
                      className="cursor-pointer text-red-500 hover:text-red-700"
                      size={18}
                      onClick={() => 
                        handleDelete(cat._id)}
                    />
                  </div>
          </div>
        ))}
      </div>



      {/* Blogs for selected category */}
      {selectedCategory && (
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6 text-center capitalize">
            {selectedCategory} Blogs
          </h2>

          {blogs.length === 0 ? (
            <p className="text-center text-gray-500">
              No blogs available in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  title={blog.title}
                  date={blog.date}
                  category={blog.category?.name || blog.category}
                  description={blog.description}
                  image={blog.image}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
