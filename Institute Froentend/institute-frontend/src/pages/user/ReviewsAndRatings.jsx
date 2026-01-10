import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // context for logged-in user
import "react-toastify/dist/ReactToastify.css";

export default function ReviewsAndRatings() {
  const { user } = useAuth(); // user.email = logged-in user's email
  const [formData, setFormData] = useState({ rating: "", comment: "" });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:8090/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err.response?.data || err.message);
      toast.error("Failed to load reviews ❌");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.email) {
      toast.error("You must be logged in to submit a review!");
      return;
    }

    if (!formData.rating || !formData.comment) {
      toast.error("Please provide both rating and comment!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8090/reviews",
        {
          rating: parseInt(formData.rating),
          comment: formData.comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-Email": user.email, // header for backend
          },
        }
      );

      toast.success("Review submitted successfully ✅");
      setFormData({ rating: "", comment: "" });
      fetchReviews(); // refresh list
    } catch (err) {
      console.error("Failed to submit review:", err.response?.data || err.message);
      toast.error(`Failed to submit review ❌: ${err.response?.data || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4">
      {/* Submit Review Form */}
      <div className="bg-white p-8 rounded shadow w-full max-w-md mb-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Reviews & Ratings</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="block font-medium">Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select rating</option>
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="1">★☆☆☆☆ (1)</option>
          </select>

          <label className="block font-medium">Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows="4"
            placeholder="Write your review..."
            required
            className="w-full border p-2 rounded resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Display All Reviews */}
      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">All Reviews</h2>
        {reviews.length === 0 && <p className="text-gray-600">No reviews yet</p>}
        {reviews.map((r) => (
          <div key={r.id} className="bg-white p-4 mb-3 rounded shadow">
            <p className="font-semibold">{r.email}</p>
            <p>Rating: {r.rating} / 5</p>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
