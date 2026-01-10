import { Link, NavLink } from "react-router-dom";

export default function AuthHeader() {
  return (
    <header className="bg-gradient-to-r from-amber-800 to-orange-600 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          IIMS
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 items-center text-white font-medium">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "underline font-semibold"
                : "hover:underline"
            }
          >
            Index
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "underline font-semibold"
                : "hover:underline"
            }
          >
            Register
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "underline font-semibold"
                : "hover:underline"
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/admin-login"
            className="bg-white text-amber-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Admin Login
          </NavLink>

        </nav>
      </div>
    </header>
  );
}
