import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Users() {

  const [users, setUsers] = useState([]);

  /* ================= FETCH ALL USERS ================= */
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8090/api/admin/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load users");
      });
  };

  /* ================= DELETE USER ================= */
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    axios
      .delete(`http://localhost:8090/api/admin/users/${id}`)
      .then(() => {
        toast.success("User deleted successfully!");
        fetchUsers();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete user");
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://tse1.mm.bing.net/th/id/OIP.HUB1lO9vxvsI8tiMrA8LHQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3')",
      }}
    >
      {/* Dark Overlay */}
      <div className="min-h-screen bg-black/60 flex items-center justify-center p-6">

        {/* Card */}
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-5xl">

          <h2 className="text-2xl font-bold mb-4 text-center">Users</h2>

          <table className="w-full text-left border-collapse">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="py-3 px-2">ID</th>
                <th className="px-2">Email</th>
                <th className="px-2">Role</th>
                <th className="px-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-2 text-center font-semibold">
                      {user.id}
                    </td>

                    <td className="px-2">{user.email}</td>

                    <td className="px-2 font-semibold">{user.role}</td>

                    <td className="px-2">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <ToastContainer position="top-right" autoClose={3000} />

        </div>
      </div>
    </div>
  );
}
