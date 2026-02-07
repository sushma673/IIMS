import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/StatCard";
import {
  FaSchool,
  FaBook,
  FaUsers,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//  Background image URL
const BG_IMAGE =
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1920&auto=format&fit=crop";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    institutes: 0,
    courses: 0,
    users: 0,
    reviews: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* ================= FETCH COUNTS ================= */
  useEffect(() => {
    axios
      .get("http://localhost:8090/api/dashboard/counts")
      .then((res) => {
        setCounts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard counts");
        setLoading(false);
      });
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p className="font-semibold mb-3">Do you want to logout?</p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                closeToast();
                toast.success("Logged out successfully 👋");
                setTimeout(() => navigate("/"), 1000);
              }}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Yes
            </button>

            <button
              onClick={closeToast}
              className="bg-gray-300 px-4 py-1 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Content */}
      <div className="relative px-4 py-6">
        <ToastContainer />

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-3">

          <div>
            <h2 className="text-3xl font-bold text-white">
              Welcome, Admin 👋
            </h2>
            <p className="text-gray-300 text-sm">
              Here’s what’s happening in your system today
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

        {/* ================= STATS ================= */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div
              onClick={() => navigate("/admin/all-institutes")}
              className="cursor-pointer"
            >
              <StatCard
                title="Institutes"
                value={counts.institutes}
                icon={<FaSchool />}
              />
            </div>

            <div
              onClick={() => navigate("/admin/courses")}
              className="cursor-pointer"
            >
              <StatCard
                title="Courses"
                value={counts.courses}
                icon={<FaBook />}
              />
            </div>

            <div
              onClick={() => navigate("/admin/users")}
              className="cursor-pointer"
            >
              <StatCard
                title="Users"
                value={counts.users}
                icon={<FaUsers />}
              />
            </div>

            <div
              onClick={() => navigate("/admin/reviews")}
              className="cursor-pointer"
            >
              <StatCard
                title="Reviews"
                value={counts.reviews}
                icon={<FaStar />}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}