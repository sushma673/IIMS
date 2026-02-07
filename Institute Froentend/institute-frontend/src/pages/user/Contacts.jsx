import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import {
  Home as HomeIcon,
  Info,
  UserPlus,
  LogIn,
  ArrowRightCircle,
} from "lucide-react";

export default function Contacts() {

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

      {/* ---------------- HERO SECTION ---------------- */}
      <div
        className="relative h-[320px] bg-cover bg-center flex items-center justify-center mt-16"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg')",
        }}
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <h1 className="relative text-white text-4xl md:text-5xl font-semibold">
          Contact
        </h1>

      </div>

      {/* ---------------- CONTACT INFO SECTION ---------------- */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Office Address */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold mb-5 text-gray-800">
                Office Address
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 text-white">
                  <FaLocationArrow />
                </div>

                <p className="text-gray-600 leading-relaxed">
                  MIG:224, II Floor, KPHB Metro Station,
                  Beside R.S. Brother's, KPHB Main Road,
                  Hyderabad - 500072, INDIA.
                </p>
              </div>
            </div>

            {/* Make a Call */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold mb-5 text-gray-800">
                Make a Call
              </h3>

              {["+91 9515306321", "+91 7601076784", "+91 9908877676"].map(
                (phone) => (
                  <div key={phone} className="flex items-center gap-4 mb-3">
                    <div className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 text-white">
                      <FaPhoneAlt />
                    </div>
                    <span className="text-gray-600">{phone}</span>
                  </div>
                )
              )}
            </div>

            {/* Send a Mail */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold mb-5 text-gray-800">
                Send a Mail
              </h3>

              {[
                "nithyasreya7659@gmail.com",
                "pappagirilokeswarireddy@gmail.com",
                "keerthipriya014@gmail.com",
              ].map((mail) => (
                <div key={mail} className="flex items-center gap-4 mb-3">
                  <div className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 text-white">
                    <FaEnvelope />
                  </div>
                  <span className="text-gray-600 break-all">{mail}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
