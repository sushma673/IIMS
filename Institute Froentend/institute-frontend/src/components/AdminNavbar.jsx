import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function AdminNavbar() {
  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-6">
        <FaBell className="text-gray-600 text-lg cursor-pointer" />
        <FaUserCircle className="text-gray-700 text-2xl cursor-pointer" />
      </div>
    </header>
  );
}