import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import AuthHeader from "../../components/AuthHeader";

export default function UserLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8090/auth/login", formData);
      // backend returns token or user info
      // we store email for reviews
      login({ email: formData.email }); 
      toast.success("Login successful!");
      navigate("/home"); // redirect to home
    } catch (err) {
      toast.error(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              name="email"
              placeholder="Email"
              type="email"
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
