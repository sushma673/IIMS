import { Link, NavLink } from "react-router-dom";

export default function Index() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= NAVBAR ================= */}
      <header className="bg-gradient-to-r from-amber-900 to-orange-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
            IIMS
          </Link>

          <nav className="flex gap-6 items-center text-white font-medium">

            {["/", "/register", "/login"].map((path, i) => (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  isActive ? "underline font-semibold" : "hover:underline"
                }
              >
                {path === "/" ? "Home" : path.replace("/", "")}
              </NavLink>
            ))}

            <NavLink
              to="/admin-login"
              className="bg-white text-amber-800 px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
            >
              Admin
            </NavLink>

          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[90vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/geometric-science-education-background-vector-gradient-blue-digital-remix_53876-125993.jpg')",
        }}
      >

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center text-white">

          {/* LEFT */}
          <div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Smart Institute <br /> Information Management System
            </h1>

            <p className="text-lg text-gray-200 mb-8">
              One powerful platform to manage institutes, students, courses,
              reviews, payments, and administration with ease.
            </p>

            <div className="flex gap-4">
              <Link
                to="/register"
                className="bg-amber-600 px-7 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="border border-white px-7 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:block">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              className="w-96 mx-auto drop-shadow-2xl"
              alt="dashboard"
            />
          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6 text-center">

          {[
            ["10K+", "Students"],
            ["500+", "Institutes"],
            ["1200+", "Courses"],
            ["24/7", "Support"],
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-xl shadow hover:shadow-xl transition"
            >
              <h3 className="text-4xl font-bold text-amber-700">{item[0]}</h3>
              <p className="mt-2 text-gray-600">{item[1]}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {[
              ["🏫", "Institute Management"],
              ["🎓", "Course Management"],
              ["💳", "Online Payments"],
              ["📊", "Reports & Analytics"],
              ["⭐", "Reviews & Ratings"],
              ["🔐", "Secure Login"],
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow hover:-translate-y-2 transition"
              >
                <div className="text-5xl mb-4">{f[0]}</div>
                <h3 className="text-xl font-semibold mb-2">{f[1]}</h3>
                <p className="text-gray-600">
                  Easy to use system with fast and reliable performance.
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3940/3940056.png"
            className="w-96 mx-auto"
            alt="about"
          />

          <div>
            <h2 className="text-4xl font-bold mb-6">
              Why Choose IIMS?
            </h2>

            <p className="text-gray-600 mb-6">
              IIMS simplifies complex institute operations into a single,
              user-friendly platform. Save time, reduce errors, and
              improve productivity.
            </p>

            <ul className="space-y-3">
              <li>✔ Easy Management</li>
              <li>✔ Secure Data</li>
              <li>✔ Cloud Ready</li>
              <li>✔ Fast Performance</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            What Users Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {["Amazing System!", "Very Helpful", "Easy to Use"].map((t, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow"
              >
                ⭐⭐⭐⭐⭐
                <p className="mt-4 text-gray-600">
                  {t}. Perfect for managing institutes digitally.
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-600 py-20 text-white">
        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold mb-4">
            Start Your Journey Today
          </h2>

          <p className="mb-8">
            Create an account and experience smart management.
          </p>

          <Link
            to="/register"
            className="bg-white text-amber-800 px-10 py-4 rounded-lg font-bold hover:bg-gray-200 transition"
          >
            Create Account
          </Link>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-gray-400 py-6 text-center">
        © 2026 IIMS | All Rights Reserved
      </footer>

    </div>
  );
}
