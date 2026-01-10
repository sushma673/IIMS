import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function HomeNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* TOP BAR */}
        <div className="flex items-center justify-between">
          {/* LOGO + TITLE */}
          <div className="flex items-center gap-2">
            <Menu className="w-6 h-6 text-blue-600" />
            <Link
              to="/"
              className="font-bold text-lg text-gray-800 hover:text-blue-600"
            >
              Institute Information Management System
            </Link>
          </div>

          {/* NAV LINKS */}
          <nav className="flex items-center gap-5 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }
            >
              About
            </NavLink>

            {!user && (
              <>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                  }
                >
                  Contact
                </NavLink>

                <NavLink
                  to="/reviews"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-semibold" : "text-gray-700"
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
                    to="/admin-dashboard"
                    className={({ isActive }) =>
                      isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                    }
                  >
                    Admin
                  </NavLink>
                ) : (
                  <NavLink
                    to="/user-dashboard"
                    className={({ isActive }) =>
                      isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                    }
                  >
                    Dashboard
                  </NavLink>
                )}

                <button
                  onClick={logout}
                  className="ml-2 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition"
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