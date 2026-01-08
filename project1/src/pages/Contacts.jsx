import React from "react";

export default function Contacts() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg')",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CONTACT CARD */}
      <div className="relative z-10 bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-4">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Contact Us
        </h1>

        {/* NAME */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* MESSAGE */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Message
          </label>
          <textarea
            rows="4"
            placeholder="Enter your message"
            className="w-full border rounded-lg p-2 outline-none resize-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* SUBMIT BUTTON */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Send Message
        </button>
      </div>
    </div>
  );
}
