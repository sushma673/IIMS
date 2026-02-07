import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Home as HomeIcon,
  Info,
  UserPlus,
  LogIn,
  ArrowRightCircle,
} from "lucide-react";

export default function ReviewsAndRatings() {

  const [formData, setFormData] = useState({
    rating: "",
    comment: ""
  });

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ FINAL FIX: READ EMAIL FROM BOTH KEYS
  const email =
    localStorage.getItem("email") ||
    localStorage.getItem("userEmail");

  /* ---------------- FETCH MY REVIEWS ---------------- */
  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8090/api/reviews/user?email=${email}`
      );
      setReviews(res.data);
    } catch (err) {
      toast.error("Failed to load your reviews ❌");
    }
  };

  useEffect(() => {
    if (email) {
      fetchReviews();
    }
  }, [email]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ---------------- SUBMIT REVIEW ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("You must be logged in to submit a review!");
      return;
    }

    if (!formData.rating || !formData.comment) {
      toast.error("Please provide rating and comment!");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `http://localhost:8090/api/reviews?email=${email}`,
        {
          rating: parseInt(formData.rating),
          comment: formData.comment,
        }
      );

      toast.success("Review submitted successfully ✅");
      setFormData({ rating: "", comment: "" });
      fetchReviews();

    } catch (err) {
      toast.error("Failed to submit review ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">

          <h1 className="font-extrabold text-lg md:text-xl">
            Institute Information Management System
          </h1>

          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="/home" className="flex items-center gap-1">
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
      </nav>

      {/* ---------------- CONTENT ---------------- */}
      <div
        className="min-h-screen bg-cover bg-center relative pt-16"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">

          {/* ---------------- REVIEW FORM ---------------- */}
          <div className="bg-white/90 rounded-2xl shadow-xl p-8">

            <h1 className="text-2xl font-bold mb-6 text-center">
              Reviews & Ratings
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select rating</option>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} ⭐
                  </option>
                ))}
              </select>

              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows="4"
                placeholder="Write your review..."
                className="w-full border p-2 rounded"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>

            </form>
          </div>

          {/* ---------------- MY REVIEWS ---------------- */}
          <div className="space-y-4">

            {reviews.length === 0 && (
              <p className="text-white text-center">
                You haven’t submitted any reviews yet.
              </p>
            )}

            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-white/90 rounded-xl p-5 shadow"
              >
                <p className="font-semibold">{r.email}</p>
                <p className="text-yellow-500">⭐ {r.rating} / 5</p>
                <p className="text-gray-600 mt-1">{r.comment}</p>
              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}
