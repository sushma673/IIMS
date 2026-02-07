import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  School,
  Home as HomeIcon,
  Info,
  UserPlus,
  LogIn,
  Award,
  BookOpen,
  ArrowRightCircle,
  Users,
  Layers,
  LogOut,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InstituteCard from "../../components/InstituteCard";

export default function Home() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [institutes, setInstitutes] = useState([]);
  const [filteredInstitutes, setFilteredInstitutes] = useState([]);
  const [current, setCurrent] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ---------------- FETCH USER EMAIL ---------------- */
  useEffect(() => {
    const email =
      localStorage.getItem("email") || localStorage.getItem("userEmail");
    if (email) setUserEmail(email);
  }, []);

  /* ---------------- FETCH INSTITUTES ---------------- */
  useEffect(() => {
    fetch("/api/institutes")
      .then((res) => res.json())
      .then((data) => {
        setInstitutes(data);
        setFilteredInstitutes(data);
      })
      .catch((err) => console.error("Error fetching institutes:", err));
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p className="font-semibold mb-3">Do you want to logout?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                localStorage.clear();
                closeToast();
                toast.success("Logged out successfully 👋");
                setTimeout(() => navigate("/"), 1000);
              }}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-300 px-4 py-1 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false, closeButton: false }
    );
  };

  /* ---------------- HERO SLIDER ---------------- */
  const images = [
    "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg",
    "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg",
    "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
  ];

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % images.length),
      3000
    );
    return () => clearInterval(timer);
  }, []);

  /* ---------------- STUDY GOALS ---------------- */
  const studyGoals = [
    {
      title: "IT Training",
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      items: ["Java", "Python", "React"],
    },
    {
      title: "Medical Coding",
      icon: <Users className="w-6 h-6 text-green-600" />,
      items: ["ICD-10", "CPC"],
    },
    {
      title: "Digital Marketing",
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
      items: ["SEO", "Ads"],
    },
    {
      title: "Government Exams",
      icon: <School className="w-6 h-6 text-pink-600" />,
      items: ["SSC", "UPSC"],
    },
    {
      title: "Medical",
      icon: <Award className="w-6 h-6 text-red-600" />,
      items: ["MBBS", "Nursing"],
    },
    {
      title: "Cyber Security",
      icon: <HomeIcon className="w-6 h-6 text-yellow-600" />,
      items: ["Ethical Hacking"],
    },
  ];

  /* ---------------- SEARCH HANDLER ---------------- */
  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setFilteredInstitutes(institutes);
      return;
    }
    const results = institutes.filter((inst) =>
      inst.name.toLowerCase().includes(query)
    );
    setFilteredInstitutes(results);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <ToastContainer position="top-right" />

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <h1 className="font-extrabold text-lg">
            Institute Information Management System
          </h1>

          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/home" className="flex items-center gap-1">
              <HomeIcon className="w-4 h-4" /> Home
            </Link>
            <Link to="/about" className="flex items-center gap-1">
              <Info className="w-4 h-4" /> About
            </Link>
            <Link to="/reviews" className="flex items-center gap-1">
              <UserPlus className="w-4 h-4" /> Reviews
            </Link>
            <Link to="/contact" className="flex items-center gap-1">
              <LogIn className="w-4 h-4" /> Contacts
            </Link>

            {userEmail && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-600"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <ArrowRightCircle />
          </button>
        </div>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <header className="relative h-[70vh] mt-16">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              current === i ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
          {userEmail && (
            <p className="text-lg mb-2">
              Welcome, <span className="font-semibold">{userEmail}</span>!
            </p>
          )}

          <h1 className="text-4xl md:text-5xl font-bold">
            Find the Best Institute
          </h1>

          <p className="mt-2 text-white/90">Search • Compare • Choose</p>

          {/* SEARCH BAR */}
          <div className="mt-6 flex w-full max-w-xl bg-white rounded-full overflow-hidden shadow-lg">
            <input
              type="text"
              placeholder="Search institute, course, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 px-5 py-3 text-gray-700 outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- STUDY GOALS ---------------- */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Select Your Study Goal</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyGoals.map((g) => (
            <div
              key={g.title}
              onClick={() =>
                navigate(
                  `/institutes?category=${encodeURIComponent(
                    g.title.toLowerCase()
                  )}`
                )
              }
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:scale-105 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {g.icon}
                <h3 className="font-semibold text-lg">{g.title}</h3>
              </div>

              <ul className="mt-3 text-sm text-gray-600 space-y-1">
                {g.items.map((it) => (
                  <li key={it}>• {it}</li>
                ))}
              </ul>

              <p className="mt-4 text-blue-600 font-semibold text-sm">
                View Institutes →
              </p>
            </div>
          ))}
        </div>

        {/* ---------------- INSTITUTES ---------------- */}
        <div className="mt-12 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstitutes.length > 0 ? (
            filteredInstitutes.map((inst) => (
              <InstituteCard key={inst.id} institute={inst} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No institutes found.
            </p>
          )}
        </div>
      </main>

      {/* ---------------- SMALL FOOTER ---------------- */}
      <footer className="bg-gray-900 text-gray-400 text-center py-4">
        © {new Date().getFullYear()} IIMS - Institute Information Management System
      </footer>
    </div>
  );
}
