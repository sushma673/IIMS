import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 flex-1 min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}