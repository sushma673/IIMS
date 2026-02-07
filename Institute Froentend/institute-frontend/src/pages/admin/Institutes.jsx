import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Background image URL
const BG_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920&auto=format&fit=crop";

export default function Institutes() {
  const [institutes, setInstitutes] = useState([]);
  const navigate = useNavigate();

  // Fetch all institutes
  useEffect(() => {
    fetchInstitutes();
  }, []);

  const fetchInstitutes = () => {
    axios
      .get("http://localhost:8090/api/institutes")
      .then((res) => setInstitutes(res.data))
      .catch((err) => console.error("Error fetching institutes:", err));
  };

  // Delete institute
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this institute?")) return;

    axios
      .delete(`http://localhost:8090/api/institutes/${id}`)
      .then(() => {
        fetchInstitutes();
        toast.success("Institute deleted successfully!");
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        toast.error("Failed to delete institute.");
      });
  };

  // Navigate to Edit page
  const handleEdit = (id) => {
    navigate(`/edit-institute/${id}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-6"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">Institutes</h2>

        <table className="w-full text-left border-collapse">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="py-3 px-2">ID</th>
              <th className="px-2">Name</th>
              <th className="px-2">City</th>
              <th className="px-2">Category</th>
              <th className="px-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {institutes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No institutes found
                </td>
              </tr>
            ) : (
              institutes.map((inst) => (
                <tr
                  key={inst.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-2 text-center font-semibold">
                    {inst.id}
                  </td>
                  <td className="px-2">{inst.name}</td>
                  <td className="px-2">{inst.city}</td>
                  <td className="px-2">{inst.category || "N/A"}</td>

                  <td className="px-2">
                    <button
                      onClick={() => handleEdit(inst.id)}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(inst.id)}
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
  );
}