import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthHeader from "../../components/AuthHeader";

// Background image for OTP page
const BG_IMAGE =
  "https://tse2.mm.bing.net/th/id/OIP.xojp-8jKVj41Z4Hpp99jcwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3.jpg";

export default function OtpVerify() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || localStorage.getItem("otpEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      toast.error("Email missing. Please register again.");
      navigate("/register");
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("OTP must be exactly 6 digits");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8090/auth/verify-otp",
        { email, otp },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("OTP verified successfully ✅");
      localStorage.removeItem("otpEmail");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("OTP ERROR:", err.response?.data);
      toast.error(err.response?.data?.message || "Invalid OTP ❌");
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

        {/* OTP Card */}
        <div className="relative bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Verify OTP
          </h2>

          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              required
              className="w-full border border-gray-300 p-3 rounded text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-800 hover:bg-amber-900 text-white py-2 rounded transition disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
}
