import React from "react";

export default function About() {
  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
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
          Institute Information Management System is a fictional platform. This
          page contains institution details, vision, mission, and contact
          information in a centralized and organized manner.
        </p>
      </div>
    </section>
  );
}
