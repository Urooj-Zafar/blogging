import { Link, useNavigate, useLocation } from "react-router-dom";
import BlogCard from "../Components/BlogCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const fetchBlogs = async (prependBlog = null) => {
    try {
      const res = await axios.get("http://localhost:3000/blogs");
      let fetchedBlogs = res.data.data || [];
      fetchedBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      if (location.state?.newBlog) {
  fetchedBlogs = [location.state.newBlog, ...fetchedBlogs];
}


      setBlogs(fetchedBlogs);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    // If coming from CreateBlog, prepend newBlog
    if (location.state?.newBlog) {
      fetchBlogs(location.state.newBlog);
      window.history.replaceState({}, ""); // clear state
    } else {
      fetchBlogs();
    }
  }, [location.state]);

  const latestBlogs = blogs.slice(0, 4);
  const previewBlogs = blogs.slice(0, 8);

  return (
    <div>
      <section className="bg-black text-white text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-6">Welcome to BrainCrafters</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Discover a world of insights, stories, and ideas—crafted to inform, inspire, and spark curiosity.
        </p>

        <div className="mt-8">
  <button
    onClick={() => navigate("/createblog")}
    className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
  >
    Create Blog
  </button>
</div>
      </section>

      <section className="min-h-screen bg-gray-100 p-8">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Latest Blogs
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : latestBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestBlogs.map((blog) => (
              <BlogCard
              key={blog._id}
              _id={blog._id}
              title={blog.title}
              date={blog.date}
              category={blog.category?.name || blog.category}
              description={blog.description}
              image={blog.image}
              />
              ))}

          </div>
        )}

        {!loading && previewBlogs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Explore More Blogs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {previewBlogs.map((blog) => (
              <BlogCard
              key={blog._id}
              _id={blog._id}
              title={blog.title}
              date={blog.date}
              category={blog.category?.name || blog.category}
              description={blog.description}
              image={blog.image}
              />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link
                to="/blogs"
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
              >
                View All Blogs
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
