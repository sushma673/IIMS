// Header.jsx
import { Link, NavLink } from "react-router-dom";

export default function IndexHeader() {
  return (
    <header className="bg-gradient-to-r from-amber-800 to-orange-600 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          IIMS
        </Link>

        {/* Nav Links */}
        <nav className="flex gap-6 items-center text-white">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-semibold underline" : "hover:underline"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "font-semibold underline" : "hover:underline"
            }
          >
            Register
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "font-semibold underline" : "hover:underline"
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/admin-login"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-amber-800 px-4 py-2 rounded-lg font-semibold shadow"
                : "bg-white text-amber-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            }
          >
            Admin Login
          </NavLink>

        </nav>
      </div>
    </header>
  );
}
