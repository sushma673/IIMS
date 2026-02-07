import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthHeader from "../../components/AuthHeader";

//  DIFFERENT background image than UserLogin
const ADMIN_BG_IMAGE =
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1920&auto=format&fit=crop";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8090/api/admin/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Admin Login Successful ");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data || "Invalid Email or Password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/*  SAME NAV BAR AS USER LOGIN */}
      <AuthHeader />

      {/*  BACKGROUND SECTION */}
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url('${ADMIN_BG_IMAGE}')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Admin Login Card */}
        <div className="relative bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Admin Login
          </h2>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Admin Email"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-800 hover:bg-amber-900 text-white py-2 rounded transition disabled:opacity-60"
            >
              {loading ? "Logging..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}