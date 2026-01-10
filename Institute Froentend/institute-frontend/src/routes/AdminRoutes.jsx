import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Dashboard from "../pages/admin/Dashboard";
import Institutes from "../pages/admin/Institutes";
import Courses from "../pages/admin/Courses";
import MediaGallery from "../pages/admin/MediaGallery";

export default function AdminRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
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
    </Routes>
  );
}
