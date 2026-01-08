import React, { useState } from "react";

export default function ReviewsAndRatings() {
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    review: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form to Spring Boot backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          rating: Number(formData.rating), // IMPORTANT: convert to number
          review: formData.review,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      alert("Review submitted successfully!");

      // Clear form
      setFormData({
        name: "",
        rating: "",
        review: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Card */}
      <div className="relative z-10 bg-white bg-opacity-95 p-8 rounded-xl shadow-lg w-full max-w-md mx-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reviews & Ratings
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select rating</option>
              <option value="5">★★★★★ (5)</option>
              <option value="4">★★★★☆ (4)</option>
              <option value="3">★★★☆☆ (3)</option>
              <option value="2">★★☆☆☆ (2)</option>
              <option value="1">★☆☆☆☆ (1)</option>
            </select>
          </div>

          {/* Review */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review
            </label>
            <textarea
              name="review"
              rows="4"
              value={formData.review}
              onChange={handleChange}
              placeholder="Write your review..."
              required
              className="w-full border rounded-lg p-2 resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
