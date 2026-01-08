import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  School,
  Home as HomeIcon,
  Info,
  UserPlus,
  LogIn,
  Award,
  BookOpen,
  MapPin,
  ArrowRightCircle,
  Users,
  Layers,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  /* ---------------- SLIDER IMAGES ---------------- */
  const images = [
    "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg",
    "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg",
    "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
  ];

  const [current, setCurrent] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % images.length),
      3000
    );
    return () => clearInterval(timer);
  }, [images.length]);

  /* ---------------- STUDY GOALS ---------------- */
  const studyGoals = [
    {
      title: "IT Training",
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      items: ["Java", "Python", "React", "Data Science"],
    },
    {
      title: "Medical Coding",
      icon: <Users className="w-6 h-6 text-green-600" />,
      items: ["ICD-10", "CPC", "Medical Billing"],
    },
    {
      title: "Digital Marketing",
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
      items: ["SEO", "Google Ads", "Social Media"],
    },
    {
      title: "Government Exams",
      icon: <School className="w-6 h-6 text-pink-600" />,
      items: ["SSC", "Banking", "UPSC"],
    },
    {
      title: "Medical",
      icon: <Award className="w-6 h-6 text-red-600" />,
      items: ["MBBS", "BDS", "Nursing"],
    },
    {
      title: "Cyber Security",
      icon: <HomeIcon className="w-6 h-6 text-yellow-600" />,
      items: ["Ethical Hacking", "Network Security"],
    },
    {
      title: "Hotel Management",
      icon: <Info className="w-6 h-6 text-cyan-600" />,
      items: ["Hospitality", "HM"],
    },
    {
      title: "Soft Skills",
      icon: <Search className="w-6 h-6 text-emerald-600" />,
      items: ["English", "Communication", "Personality"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ---------------- NAVBAR ---------------- */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <h1 className="font-extrabold text-lg md:text-xl">
            Institute Information Management System
          </h1>

          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="/" className="flex items-center gap-1">
              <HomeIcon className="w-4 h-4" /> Home
            </a>
            <a href="/about" className="flex items-center gap-1">
              <Info className="w-4 h-4" /> About
            </a>
            <a href="/reviews" className="flex items-center gap-1">
              <UserPlus className="w-4 h-4" /> Reviews & Ratings
            </a>
            <a href="/contact" className="flex items-center gap-1">
              <LogIn className="w-4 h-4" /> Contacts
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <ArrowRightCircle />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <a href="/" className="block px-4 py-2">Home</a>
            <a href="/about" className="block px-4 py-2">About</a>
            <a href="/reviews" className="block px-4 py-2">Reviews & Ratings</a>
            <a href="/contact" className="block px-4 py-2">Contacts</a>
          </div>
        )}
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
          <h1 className="text-3xl md:text-5xl font-bold">
            Find the Best Institute
          </h1>
          <p className="mt-2 text-white/90">
            Search • Compare • Choose
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-3 w-full max-w-4xl">
            <input
              className="p-3 rounded-md text-white-800"
              placeholder="Institute Name"
            />
            <input
              className="p-3 rounded-md text-white-800"
              placeholder="Course"
            />
            <input
              className="p-3 rounded-md text-white-800"
              placeholder="Location"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold flex items-center justify-center gap-2">
              <Search className="w-4 h-4" /> Search
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- STUDY GOALS ---------------- */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">
          Select Your Study Goal
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyGoals.map((g) => (
            <div
              key={g.title}
              onClick={() =>
                navigate(`/institutes?category=${encodeURIComponent(g.title)}`)
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
      </main>
    </div>
  );
}
