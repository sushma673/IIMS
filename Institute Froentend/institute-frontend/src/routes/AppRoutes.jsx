import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* Auth */
import Index from "../pages/auth/Index";
import UserLogin from "../pages/auth/UserLogin";
import UserRegister from "../pages/auth/UserRegister";
import OtpVerify from "../pages/auth/OtpVerify";

/* User */
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Contacts from "../pages/user/Contacts";
import ReviewsAndRatings from "../pages/user/ReviewsAndRatings";

/* Admin */
import Dashboard from "../pages/admin/Dashboard";
import Institutes from "../pages/admin/Institutes";
import Courses from "../pages/admin/Courses";
import MediaGallery from "../pages/admin/MediaGallery";

export default function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/verify-otp" element={<OtpVerify />} />

      {/* User */}
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contacts />} />
      <Route path="/reviews" element={<ReviewsAndRatings />} />

      {/* Admin (PROTECTED) */}
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/institutes"
        element={token ? <Institutes /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/courses"
        element={token ? <Courses /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/media"
        element={token ? <MediaGallery /> : <Navigate to="/login" replace />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
