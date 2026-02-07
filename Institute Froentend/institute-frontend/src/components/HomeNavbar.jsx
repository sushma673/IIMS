import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomeNavbar() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 🔥 LOGOUT WITH TOAST CONFIRMATION
  const handleLogout = () => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p className="font-semibold mb-3">
            Do you want to logout?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                logout(); // context logout
                localStorage.clear(); // clear storage
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

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">

      <ToastContainer position="top-right" />

      <div className="max-w-7xl mx-auto px-4 py-3">

        {/* TOP BAR */}
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <Menu className="w-6 h-6 text-blue-600" />
            <Link
              to="/home"
              className="font-bold text-lg text-gray-800 hover:text-blue-600"
            >
              Institute Information Management System
            </Link>
          </div>

          {/* NAV LINKS */}
          <nav className="flex items-center gap-5 text-sm font-medium">

            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }
            >
              About
            </NavLink>

            {!user && (
              <>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700"
                  }
                >
                  Contact
                </NavLink>

                <NavLink
                  to="/reviews"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700"
                  }
                >
                  Reviews
                </NavLink>
              </>
            )}

            {user && (
              <>
                {user.role === "admin" ? (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700"
                    }
                  >
                    Admin
                  </NavLink>
                ) : (
                  <NavLink
                    to="/user-dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700"
                    }
                  >
                    Dashboard
                  </NavLink>
                )}

                {/* LOGOUT BUTTON */}
                <button
                  onClick={handleLogout}
                  className="ml-2 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

        </div>
      </div>
    </header>
  );
}
