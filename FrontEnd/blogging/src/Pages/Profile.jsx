import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../Components/BlogCard";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);


  const handleDeleteSuccess = (id) => {
    setBlogs((prev) =>
      prev.filter((blog) => blog._id !== id)
    );
  };


  useEffect(() => {
    fetchMyBlogs();
  }, []);


  const fetchMyBlogs = async () => {
    try {

      const res = await axios.get(
        "http://localhost:3000/blogs"
      );


      const myBlogs = res.data.data.filter(
        (blog) =>
          blog.author?._id === user?._id ||
          blog.author === user?._id ||
          blog.authorId === user?._id
      );


      setBlogs(myBlogs);

    } catch (err) {

      console.log("Error fetching blogs:", err);

    } finally {

      setLoading(false);

    }
  };


  return (
    <div>


      {/* Header */}

      <section className="bg-black text-white py-16">

        <div className="max-w-6xl mx-auto px-6 flex items-center gap-8">


          <img
            src="https://ui-avatars.com/api/?name=User"
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-orange-500"
          />


          <div>

            <h1 className="text-4xl font-bold">
              {user?.name}
            </h1>


            <p className="text-gray-300 mt-2">
              {user?.email}
            </p>


            <p className="mt-2">
              Total Blogs: {blogs.length}
            </p>

          </div>


        </div>

      </section>



      {/* My Blogs */}


      <div className="max-w-7xl mx-auto py-10 px-6">


        <h2 className="text-3xl font-bold mb-8">
          My Blogs
        </h2>



        {
          loading ? (

            <p>
              Loading...
            </p>


          ) : blogs.length === 0 ? (

            <p>
              You haven't created any blogs yet.
            </p>


          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


              {
                blogs.map((blog) => (

                  <BlogCard

                    key={blog._id}

                    _id={blog._id}

                    title={blog.title}

                    image={blog.image}

                    description={blog.description}

                    category={blog.category?.name || blog.category}

                    date={blog.date}

                    authorId={
                      blog.author?._id ||
                      blog.author ||
                      blog.authorId
                    }

                    userId={user?._id}

                    showActions={true}

                    onDeleteSuccess={handleDeleteSuccess}

                  />

                ))
              }


            </div>

          )
        }


      </div>


    </div>
  );
}