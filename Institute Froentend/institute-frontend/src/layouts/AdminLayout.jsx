import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 flex-1 min-h-screen bg-gray-100">
        <AdminNavbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
