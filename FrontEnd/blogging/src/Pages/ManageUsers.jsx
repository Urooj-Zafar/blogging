import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((prev) => prev.filter((u) => u._id !== id));

      alert("User deleted successfully");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Manage Users
        </h1>

        <button
          onClick={() => navigate("/admin")}
          className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 w-full sm:w-auto"
        >
          Dashboard
        </button>
      </div>

      <div className="space-y-4">
        {users.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
            No users found.
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-xl shadow p-5"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={
                      user.profileImage ||
                         `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name || "User"
                          )}`
                    }
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-orange-500 flex-shrink-0"
                  />

                  <div>
                    <h2 className="text-lg font-bold">
                      {user.name}
                    </h2>

                    <p className="text-gray-600 break-all">
                      {user.email}
                    </p>

                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>

                {user.role !== "admin" && (
                  <MdDelete
                    size={26}
                    className="text-red-600 cursor-pointer hover:text-red-800 self-end sm:self-center"
                    onClick={() => handleDelete(user._id)}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
