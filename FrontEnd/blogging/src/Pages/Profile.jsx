import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../Components/BlogCard";

export default function Profile() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const token = localStorage.getItem("token");

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [updating, setUpdating] = useState(false);

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
        `${import.meta.env.VITE_API_URL}/blogs`
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

  const openEditProfile = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPassword("");
    setSelectedFile(null);
    setEditOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB.");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpdateProfile = async () => {
    if (!name.trim() || !email.trim()) {
      alert("Name and email are required.");
      return;
    }

    try {
      setUpdating(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);

      if (password.trim()) {
        formData.append("password", password);
      }

      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/profile/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status) {
        const updatedUser = res.data.user;

       
        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

        setEditOpen(false);

        alert("Profile updated successfully!");
      } else {
        alert(
          res.data.message || "Profile update failed"
        );
      }

    } catch (err) {
      console.log("Profile update error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>

     
      <section className="bg-black text-white py-16">

        <div className="max-w-6xl mx-auto px-6">

          <div className="flex justify-end mb-6">

            <button
              onClick={openEditProfile}
              className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-md font-semibold transition"
            >
              Update Profile
            </button>

          </div>


          <div className="flex items-center gap-8">

            <img
              src={
                user?.profileImage
                  ? `${import.meta.env.VITE_API_URL}${user.profileImage}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.name || "User"
                    )}`
              }
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-orange-500 object-cover"
            />

            {/* User Information */}
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

        </div>

      </section>


      {/* ================= MY BLOGS ================= */}

      <div className="max-w-7xl mx-auto py-10 px-6">

        <h2 className="text-3xl font-bold mb-8">
          My Blogs
        </h2>

        {loading ? (

          <p>Loading...</p>

        ) : blogs.length === 0 ? (

          <p>
            You haven't created any blogs yet.
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {blogs.map((blog) => (

              <BlogCard
                key={blog._id}
                _id={blog._id}
                title={blog.title}
                image={blog.image}
                description={blog.description}
                category={
                  blog.category?.name ||
                  blog.category
                }
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

            ))}

          </div>

        )}

      </div>


      {/* ================= UPDATE PROFILE MODAL ================= */}

      {editOpen && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                Update Profile
              </h2>

              <button
                onClick={() => setEditOpen(false)}
                className="text-gray-500 hover:text-black text-2xl"
              >
                ×
              </button>

            </div>


            {/* Profile Image */}
            <div className="flex flex-col items-center mb-6">

              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : user?.profileImage
                    ? `${import.meta.env.VITE_API_URL}${user.profileImage}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.name || "User"
                      )}`
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 mb-3"
              />

              <label className="cursor-pointer text-orange-500 hover:text-orange-600 font-semibold">

                Change Profile Picture

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>

            </div>


            {/* Name */}
            <label className="block font-semibold mb-1">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md p-3 mb-4 text-black"
              placeholder="Enter your name"
            />


            {/* Email */}
            <label className="block font-semibold mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md p-3 mb-4 text-black"
              placeholder="Enter your email"
            />


            {/* Password */}
            <label className="block font-semibold mb-1">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md p-3 mb-6 text-black"
              placeholder="Leave empty to keep current password"
            />


            {/* Buttons */}
            <div className="flex justify-end gap-3">

              <button
                onClick={() => setEditOpen(false)}
                disabled={updating}
                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateProfile}
                disabled={updating}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-5 py-2 rounded-md"
              >
                {updating
                  ? "Updating..."
                  : "Save Changes"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
