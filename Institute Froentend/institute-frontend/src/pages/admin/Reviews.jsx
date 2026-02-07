import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Reviews() {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  //  FETCH ALL REVIEWS (NO TOKEN)
  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8090/api/admin/reviews"
      );
      setReviews(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load reviews");
    }
  };

  // ✅ DELETE REVIEW
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(
        `http://localhost:8090/api/admin/reviews/${id}`
      );

      toast.success("Review deleted successfully");
      fetchReviews();

    } catch (error) {
      console.error(error);
      toast.error("Failed to delete review");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/z/star-rating-review-customer-experience-hand-text-template-background-cartoon-business-design-concept-vector-illustration-101188106.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="min-h-screen bg-black/60 flex items-center justify-center p-6">

        {/* Card */}
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-5xl">

          <h2 className="text-2xl font-bold mb-4 text-center">Reviews</h2>

          <table className="w-full border-collapse">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="py-2">ID</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No reviews found
                  </td>
                </tr>
              ) : (
                reviews.map((rev) => (
                  <tr key={rev.id} className="border-b text-center hover:bg-gray-50">
                    <td className="py-2">{rev.id}</td>
                    <td>{rev.email}</td>
                    <td>{rev.rating} ⭐</td>
                    <td>{rev.comment}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(rev.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <ToastContainer position="top-right" autoClose={3000} />

        </div>
      </div>
    </div>
  );
}
