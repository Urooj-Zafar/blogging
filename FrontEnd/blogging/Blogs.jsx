import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../Components/BlogCard";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle blog deletion
  const handleDeleteSuccess = (id) => {
    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/blogs");
        let fetchedBlogs = res.data.data || [];

        // Format date and sort latest first
        fetchedBlogs = fetchedBlogs
          .map((blog) => ({
            ...blog,
            date: new Date(blog.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
            date={blog.date}
            category={blog.category?.name || blog.category}
            description={blog.description}
            image={blog.image}
            authorId={blog.author._id}
            userId={user?._id}
            onDeleteSuccess={handleDeleteSuccess}
          />
          ))}
        </div>
      )}

      {/* No blogs message */}
      {!loading && blogs.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No blogs available yet.
        </p>
      )}
    </div>
  );
}