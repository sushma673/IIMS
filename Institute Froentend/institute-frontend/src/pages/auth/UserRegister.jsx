import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthHeader from "../../components/AuthHeader";

export default function UserRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8090/auth/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(res.data);
      toast.info("OTP sent to your email");

      // Save email for OTP page
      localStorage.setItem("otpEmail", formData.email);

      navigate("/verify-otp", { state: { email: formData.email } });

    } catch (err) {
      toast.error(err.response?.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <button
              disabled={loading}
              className="w-full bg-amber-800 text-white py-2 rounded"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
