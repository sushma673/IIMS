import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Info,
  UserPlus,
  LogIn,
  ArrowRightCircle,
} from "lucide-react";

export default function About() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">

          <h1 className="font-extrabold text-lg md:text-xl">
            Institute Information Management System
          </h1>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-6 text-sm font-medium">

            <Link to="/home" className="flex items-center gap-1">
              <HomeIcon className="w-4 h-4" /> Home
            </Link>

            <Link to="/about" className="flex items-center gap-1">
              <Info className="w-4 h-4" /> About
            </Link>

            <Link to="/reviews" className="flex items-center gap-1">
              <UserPlus className="w-4 h-4" /> Reviews & Ratings
            </Link>

            <Link to="/contact" className="flex items-center gap-1">
              <LogIn className="w-4 h-4" /> Contacts
            </Link>

          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <ArrowRightCircle />
          </button>

        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">

            <Link to="/home" className="block px-4 py-2">
              Home
            </Link>

            <Link to="/about" className="block px-4 py-2">
              About
            </Link>

            <Link to="/reviews" className="block px-4 py-2">
              Reviews & Ratings
            </Link>

            <Link to="/contact" className="block px-4 py-2">
              Contacts
            </Link>

          </div>
        )}

      </nav>

      {/* ---------------- HERO / CONTENT ---------------- */}
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center relative pt-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498243691581-b145c3f54a5a')",
        }}
      >

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Centered content */}
        <div className="relative z-10 max-w-3xl bg-white/90 p-10 rounded-2xl shadow-xl text-center space-y-4">

          <h2 className="text-3xl font-semibold">
            About Institute Information Management System
          </h2>

          <p className="text-gray-700">
            Institute Information Management System is a fictional platform.
            This page contains institution details, vision, mission, and contact
            information in a centralized and organized manner.
          </p>

        </div>

      </section>
    </div>
  );
}
