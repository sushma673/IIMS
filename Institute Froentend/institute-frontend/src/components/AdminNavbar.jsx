import React from "react";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-3">
        <Link to="/admin" className="block hover:text-yellow-400">
          Dashboard
        </Link>
        <Link to="/admin/manage-institutes" className="block hover:text-yellow-400">
          Manage Institutes
        </Link>
        <Link to="/admin/media" className="block hover:text-yellow-400">
          Media Gallery
        </Link>
      </nav>
    </aside>
  );
}