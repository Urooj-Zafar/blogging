import { useState, useEffect } from "react";
import BlogCard from "../Components/BlogCard";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // Fetch categories
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


  // Fetch blogs according to category
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/blogs");

        const filteredBlogs = res.data.data.filter(
          (blog) => blog.category?.name === selectedCategory
        );

        setBlogs(filteredBlogs);

      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs([]);
      }
    };

    fetchBlogs();

  }, [selectedCategory]);


  return (
    <div>

      <section className="bg-black text-white text-center py-20 px-4 w-full">
        <h1 className="text-5xl font-bold mb-6">Blogs Categories</h1>

        
      </section>


      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">

        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`cursor-pointer flex flex-col justify-center items-center p-6 rounded-xl shadow-md transition hover:-translate-y-1
            ${
              selectedCategory === cat.name
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-800"
            }`}
          >

            <img
              src={
                cat.image
                  ? `http://localhost:3000${cat.image}`
                  : "/default.jpg"
              }
              alt={cat.name}
              className="h-32 w-32 mb-4 rounded-full object-cover"
            />

            <span className="text-lg font-semibold">
              {cat.name}
            </span>

          </div>
        ))}

      </div>



      {/* Blogs */}
      {selectedCategory && (

        <div className="p-10">

          <h2 className="text-3xl font-bold text-center mb-6">
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

                  _id={blog._id}

                  title={blog.title}

                  image={blog.image}

                  description={blog.description}

                  category={blog.category?.name}

                  date={blog.date}

                  authorId={blog.author?._id}

                />

              ))}

            </div>

          )}

        </div>

      )}

    </div>
  );
}