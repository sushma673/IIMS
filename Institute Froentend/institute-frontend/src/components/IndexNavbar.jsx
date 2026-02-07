import { Link } from "react-router-dom";

export default function IndexNavbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow">

      {/* LOGO */}
      <h1 className="text-2xl font-bold text-amber-800">
        IMS
      </h1>

      {/* NAV LINKS */}
      <div className="flex gap-8 items-center">

        <Link
          to="/"
          className="text-amber-800 font-semibold hover:underline"
        >
          Index
        </Link>

        <Link
          to="/register"
          className="text-gray-700 hover:text-amber-800"
        >
          Register
        </Link>

        <Link
          to="/login"
          className="text-gray-700 hover:text-amber-800"
        >
          Login
        </Link>

        <Link
          to="/admin-login"
          className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-900"
        >
          Admin Login
        </Link>

      </div>
    </nav>
  );
}
