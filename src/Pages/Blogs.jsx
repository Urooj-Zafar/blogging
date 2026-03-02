import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../Components/BlogCard";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleDeleteSuccess = (id) => {
  setBlogs((prev) => prev.filter((b) => b._id !== id));
};
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/blogs"); 
        let fetchedBlogs = res.data.data || [];
fetchedBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
setBlogs(fetchedBlogs); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs([]);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Header */}
      <section className="bg-black text-white text-center py-20 px-4 w-full">
        <h1 className="text-5xl font-bold mb-6">Our Blogs</h1>
      </section>

      {/* Loading message */}
      {loading && (
        <p className="text-center text-gray-500 mt-10">Loading blogs...</p>
      )}

      {/* Blogs Grid */}
      {!loading && blogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
          {blogs.map((blog) => (
            <BlogCard
            key={blog._id}
            _id={blog._id}
            title={blog.title}
            image={blog.image}
            date={blog.date}
            category={blog.category?.name}
            description={blog.description}
            showActions={true}
            onDeleteSuccess={handleDeleteSuccess}
  />
))}
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No blogs available yet.
        </p>
      )}
    </div>
  );
}
