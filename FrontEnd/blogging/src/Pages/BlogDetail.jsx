import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);


  useEffect(() => {

    const fetchBlog = async () => {

      try {

        const res = await axios.get(
          `http://localhost:3000/blogs/${id}`
        );

        setBlog(res.data.data);

      } catch (err) {

        console.error(err);

      }

    };

    fetchBlog();

  }, [id]);



  if (!blog) return <p>Loading...</p>;



  return (

    <div className="max-w-4xl mx-auto p-6">


      <img
        src={`http://localhost:3000${blog.image}`}
        className="w-full h-80 object-cover rounded mb-6"
        alt={blog.title}
      />



      <h1 className="text-4xl font-bold mb-4">
        {blog.title}
      </h1>



      <p className="text-gray-500 mb-6">
        {blog.category?.name}
      </p>



      <p className="text-lg leading-relaxed whitespace-pre-line">

        <span className="font-bold">
          Description:
        </span>{" "}

        {blog.description}

      </p>



      <p className="pt-10 text-lg leading-relaxed whitespace-pre-line">

        <span className="font-bold">
          Content:
        </span>{" "}

        {blog.content}

      </p>



      <p className="pt-5 text-lg leading-relaxed">

        <span className="font-bold">
          Published by:
        </span>{" "}

        {blog.author?.name}

      </p>



      {/* Back Button */}

      <button
        onClick={() => navigate("/blogs")}
        className="mt-10 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
      >
        ← Back to Blogs
      </button>


    </div>

  );
}