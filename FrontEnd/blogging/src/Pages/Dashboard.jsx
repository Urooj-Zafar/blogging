import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUsers, FaBlog, FaTags } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi2";
import { BiCategory } from "react-icons/bi";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    users: 0,
    blogs: 0,
    categories: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [usersRes, blogsRes, categoriesRes] = await Promise.all([
        axios.get("http://localhost:3000/users", config),
        axios.get("http://localhost:3000/blogs", config),
        axios.get("http://localhost:3000/categories", config),
      ]);

      setStats({
        users: usersRes.data.data?.length || 0,
        blogs: blogsRes.data.data?.length || 0,
        categories: categoriesRes.data.data?.length || 0,
      });
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-2">
          Admin Dashboard
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Welcome back, {user.name}
        </p>

        {loading ? (
          <p className="text-center text-lg">Loading Dashboard...</p>
        ) : (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-white rounded-xl shadow-lg p-8 flex items-center gap-5">
                <FaUsers className="text-5xl text-orange-500" />
                <div>
                  <h2 className="text-xl font-semibold">Users</h2>
                  <p className="text-4xl font-bold mt-2">
                    {stats.users}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 flex items-center gap-5">
                <FaBlog className="text-5xl text-orange-500" />
                <div>
                  <h2 className="text-xl font-semibold">Blogs</h2>
                  <p className="text-4xl font-bold mt-2">
                    {stats.blogs}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 flex items-center gap-5">
                <FaTags className="text-5xl text-orange-500" />
                <div>
                  <h2 className="text-xl font-semibold">Categories</h2>
                  <p className="text-4xl font-bold mt-2">
                    {stats.categories}
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="mt-14">

              <h2 className="text-3xl font-bold mb-6">
                Quick Actions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div
                  onClick={() => navigate("/admin/users")}
                  className="cursor-pointer bg-blue-600 text-white rounded-xl p-8 hover:bg-blue-700 transition duration-300"
                >
                  <MdManageAccounts className="text-5xl mb-4" />

                  <h3 className="text-2xl font-bold">
                    Manage Users
                  </h3>

                  <p className="mt-3">
                    View all users and manage their roles.
                  </p>
                </div>

                <div
                  onClick={() => navigate("/admin/blogs")}
                  className="cursor-pointer bg-green-600 text-white rounded-xl p-8 hover:bg-green-700 transition duration-300"
                >
                  <HiDocumentText className="text-5xl mb-4" />

                  <h3 className="text-2xl font-bold">
                    Manage Blogs
                  </h3>

                  <p className="mt-3">
                    Edit or delete any blog on the website.
                  </p>
                </div>

                <div
                  onClick={() => navigate("/admin/categories")}
                  className="cursor-pointer bg-orange-500 text-white rounded-xl p-8 hover:bg-orange-600 transition duration-300"
                >
                  <BiCategory className="text-5xl mb-4" />

                  <h3 className="text-2xl font-bold">
                    Manage Categories
                  </h3>

                  <p className="mt-3">
                    Create, edit and remove blog categories.
                  </p>
                </div>

              </div>

            </div>

          </>
        )}

      </div>

    </div>
  );
}