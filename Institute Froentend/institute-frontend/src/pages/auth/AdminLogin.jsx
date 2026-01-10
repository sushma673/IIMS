import { useState } from "react";
import { Link } from "react-router-dom";
import { adminLogin } from "../services/authService";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminLogin(email, password);
      alert("Admin Login Successful");
    } catch (err) {
      alert("Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ===== HEADER (same page-level header like others) ===== */}
      <header className="bg-amber-800 text-white py-4 shadow">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            IIMS
          </Link>

          <nav className="flex gap-6 font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/login" className="hover:underline">User Login</Link>
          </nav>
        </div>
      </header>

      {/* ===== ADMIN LOGIN CARD ===== */}
      <div className="flex items-center justify-center mt-16">
        <div className="bg-white p-8 rounded shadow w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Admin Login
          </h2>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Admin Email"
              className="w-full border p-3 rounded"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              disabled={loading}
              className="w-full bg-amber-800 text-white py-2 rounded hover:bg-amber-700"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
