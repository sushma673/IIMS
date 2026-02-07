import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthHeader from "../../components/AuthHeader";

// Different background image for UserRegister
const BG_IMAGE =
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920&auto=format&fit=crop";

export default function UserRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8090/auth/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data);
      toast.info("OTP sent to your email");

      localStorage.setItem("otpEmail", formData.email);
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      toast.error(err.response?.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />

      {/* Background */}
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Register card */}
        <div className="relative bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Register
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-700"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-700"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-800 hover:bg-amber-900 text-white py-2 rounded transition disabled:opacity-60"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}