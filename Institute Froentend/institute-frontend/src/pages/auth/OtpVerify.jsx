import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthHeader from "../../components/AuthHeader";

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
    <>
      <AuthHeader />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              required
              className="w-full border p-3 rounded text-center tracking-widest text-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-800 text-white py-2 rounded"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
