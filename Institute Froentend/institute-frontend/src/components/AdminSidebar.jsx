import { NavLink } from "react-router-dom";
import { FaChartPie, FaSchool, FaBook, FaStar, FaUsers, FaImages } from "react-icons/fa";

export default function AdminSidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition
     ${isActive ? "bg-orange-600 text-white" : "text-gray-300 hover:bg-gray-800"}`;

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed">
      <div className="p-6 text-2xl font-bold border-b border-gray-800">
        IIMS Admin
      </div>

      <nav className="p-4 space-y-2">
        <NavLink to="/" className={linkClass}><FaChartPie /> Dashboard</NavLink>
        <NavLink to="/institutes" className={linkClass}><FaSchool /> Institutes</NavLink>
        <NavLink to="/courses" className={linkClass}><FaBook /> Courses</NavLink>
        <NavLink to="/media" className={linkClass}><FaImages /> Media</NavLink>
        <NavLink to="/reviews" className={linkClass}><FaStar /> Reviews</NavLink>
        <NavLink to="/users" className={linkClass}><FaUsers /> Users</NavLink>
        <NavLink to="/manage-institutes" className={linkClass}><FaSchool /> Manage Institutes</NavLink>

      </nav>
    </aside>
  );
}