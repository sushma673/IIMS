import { Routes, Route, Navigate } from "react-router-dom";

/* Admin Edit */
import EditInstitute from "../pages/admin/EditInstitute"; 
import EditCourses from "../pages/admin/EditCourses";
import EditSyllabus from "../pages/admin/EditSyllabus";

/* Auth */
import Index from "../pages/auth/Index";
import UserLogin from "../pages/auth/UserLogin";
import UserRegister from "../pages/auth/UserRegister";
import OtpVerify from "../pages/auth/OtpVerify";
import AdminLogin from "../pages/auth/AdminLogin";

/* User */
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Contacts from "../pages/user/Contacts";
import ReviewsAndRatings from "../pages/user/ReviewsAndRatings";
import InstitutesUser from "../pages/user/InstitutesUser";
import InstitutesByCategory from "../pages/user/InstitutesByCategory"; //  ADD
import InstituteDetails from "../components/InstituteDetail";

/* Admin */
import Dashboard from "../pages/admin/Dashboard";
import InstitutesAdmin from "../pages/admin/Institutes";
import Courses from "../pages/admin/Courses";
import MediaGallery from "../pages/admin/MediaGallery";
import ManageInstitutes from "../pages/admin/ManageInstitutes";
import AllInstitutes from "../pages/admin/AllInstitutes";
import Syllabus from "../pages/admin/Syllabus";
import Reviews from "../pages/admin/Reviews";
import Users from "../pages/admin/Users";


/* Layout */
import AdminLayout from "../layouts/AdminLayout";

export default function AppRoutes() {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/verify-otp" element={<OtpVerify />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* USER */}
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contacts />} />
      <Route path="/reviews" element={<ReviewsAndRatings />} />
      <Route path="/institutes" element={<InstitutesByCategory />} />




      {/* ALL INSTITUTES */}
      <Route path="/institutes" element={<InstitutesUser />} />

      {/*  CATEGORY FILTER ROUTE (THIS FIXES YOUR ISSUE) */}
      <Route
        path="/institutes/category/:category"
        element={<InstitutesByCategory />}
      />

      {/* INSTITUTE DETAILS */}
      <Route path="/institute/:id" element={<InstituteDetails />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="all-institutes" element={<AllInstitutes />} />
        <Route path="institutes" element={<InstitutesAdmin />} />
        <Route path="courses" element={<Courses />} />
        <Route path="media" element={<MediaGallery />} />
        <Route path="manage-institutes" element={<ManageInstitutes />} />
        <Route path="syllabus" element={<Syllabus />} />
        <Route path="/admin/reviews" element={<Reviews />} />
        <Route path="users" element={<Users />} />
      </Route>

      {/* EDIT ROUTES */}
      <Route path="/edit-institute/:id" element={<EditInstitute />} />
      <Route
        path="/edit-course/:instituteId/:courseId"
        element={<EditCourses />}
      />
      <Route
        path="/edit-syllabus/:instituteId/:courseId/:syllabusId"
        element={<EditSyllabus />}
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}
