import { Link } from "react-router-dom";

export default function AuthNavbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-lg">IIMS</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/admin-login">Admin</Link>
      </div>
    </nav>
  );
}