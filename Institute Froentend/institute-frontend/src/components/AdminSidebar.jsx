import React from "react";
import { FaBookOpen } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { 
  FaChartPie, 
  FaSchool, 
  FaBook, 
  FaStar, 
  FaUsers, 
  FaImages, 
  FaPlus 
} from "react-icons/fa";

export default function AdminSidebar() {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
     ${isActive 
       ? "bg-orange-600 text-white" 
       : "text-gray-300 hover:bg-gray-800 hover:text-white"}`;

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed flex flex-col">

      <div className="p-6 text-2xl font-bold border-b border-gray-800">
        IIMS Admin
      </div>

      <nav className="p-4 flex-1 flex flex-col gap-2">

        <NavLink to="/admin/dashboard" className={linkClass}>
          <FaChartPie /> Dashboard
        </NavLink>

        {/* ✅ ALL INSTITUTES */}
        <NavLink to="/admin/all-institutes" className={linkClass}>
          <FaSchool /> All Institutes
        </NavLink>

        <NavLink to="/admin/institutes" className={linkClass}>
          <FaSchool /> Institutes
        </NavLink>

        <NavLink to="/admin/courses" className={linkClass}>
          <FaBook /> Courses
        </NavLink>

        <NavLink to="/admin/media" className={linkClass}>
          <FaImages /> Media
        </NavLink>

        <NavLink to="/admin/reviews" className={linkClass}>
          <FaStar /> Reviews
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <FaUsers /> Users
        </NavLink>

        <NavLink to="/admin/manage-institutes" className={linkClass}>
          <FaPlus /> Manage Institutes
        </NavLink>

        <NavLink to="/admin/syllabus" className={linkClass}>
  <FaBookOpen /> Syllabus
</NavLink>


      </nav>
    </aside>
  );
}
