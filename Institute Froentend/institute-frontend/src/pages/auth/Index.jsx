import { Link, NavLink } from "react-router-dom";

export default function Index() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= HEADER / NAVBAR ================= */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-amber-800">
            IIMS
          </Link>

          {/* Nav Links */}
          <nav className="flex gap-6 items-center">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-amber-800 font-semibold"
                  : "text-gray-700 hover:text-amber-800"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-amber-800 font-semibold"
                  : "text-gray-700 hover:text-amber-800"
              }
            >
              Register
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-amber-800 font-semibold"
                  : "text-gray-700 hover:text-amber-800"
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/admin-login"
              className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
            >
              Admin Login
            </NavLink>

          </nav>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-600 text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Institute Information <br /> Management System
          </h1>

          <p className="text-lg text-orange-100 mb-8 max-w-3xl mx-auto">
            A centralized platform to manage institutes, courses, users,
            reviews, and administration efficiently.
          </p>

          <div className="flex justify-center flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-white text-amber-800 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
            >
              Get Started
            </Link>

            <Link
              to="/home"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-800 transition"
            >
              Explore Institutes
            </Link>
          </div>

        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose Our Platform?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-amber-700 text-4xl mb-4">🏫</div>
            <h3 className="text-xl font-semibold mb-2">
              Institute Management
            </h3>
            <p className="text-gray-600">
              Manage institute details, media, courses, and infrastructure in one place.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-amber-700 text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold mb-2">
              Course & Syllabus Control
            </h3>
            <p className="text-gray-600">
              Add, update, and organize courses with syllabus and pricing details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-amber-700 text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-2">
              Reviews & Ratings
            </h3>
            <p className="text-gray-600">
              Students can review institutes and admins can moderate feedback.
            </p>
          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="text-3xl mb-3">📝</div>
              <h4 className="font-semibold mb-2">Register</h4>
              <p className="text-sm text-gray-600">
                User registers using email and receives confirmation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="text-3xl mb-3">🔐</div>
              <h4 className="font-semibold mb-2">Login with OTP</h4>
              <p className="text-sm text-gray-600">
                Secure login using email and OTP verification.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="text-3xl mb-3">🔍</div>
              <h4 className="font-semibold mb-2">Explore Institutes</h4>
              <p className="text-sm text-gray-600">
                Browse institutes, courses, images, and videos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="text-3xl mb-3">🛠️</div>
              <h4 className="font-semibold mb-2">Admin Control</h4>
              <p className="text-sm text-gray-600">
                Admin manages institutes, courses, and reviews.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-amber-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-4">
            Ready to Manage Institutes Smarter?
          </h2>

          <p className="text-orange-100 mb-6">
            Register now and explore institutes with ease.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-amber-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Register Now
            </Link>

            <Link
              to="/login"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-800"
            >
              Login
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
