import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Background image
const BG_IMAGE =
  "https://as2.ftcdn.net/v2/jpg/01/22/76/21/1000_F_122762173_Kv34fbzpJqvtQnWtZcB4rP2kYxlVgzsr.jpg";

export default function EditCourses() {

  const { instituteId, courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    courseName: "",
    courseCode: "",
    duration: "",
    fees: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);

  // ================= FETCH COURSE =================
  useEffect(() => {

    axios.get(
      `http://localhost:8090/api/institutes/${instituteId}/courses/${courseId}`
    )
    .then(res => {
      setCourse(res.data);
    })
    .catch(() => {
      toast.error("Failed to load course");
    })
    .finally(() => setLoading(false));

  }, [instituteId, courseId]);

  // ================= CHANGE =================
  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    });
  };

  // ================= UPDATE COURSE =================
  const handleSave = async (e) => {
    e.preventDefault();

    try {

      await axios.put(
        `http://localhost:8090/api/institutes/${instituteId}/courses/${courseId}`,
        {
          ...course,
          fees: course.fees ? Number(course.fees) : null
        }
      );

      toast.success("Course updated successfully!");

    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col">

      {/* Background */}
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Card */}
        <div className="relative bg-white p-8 rounded-xl shadow-xl w-full max-w-3xl">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 mb-4"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Edit Course
          </h2>

          <form
            onSubmit={handleSave}
            className="grid grid-cols-2 gap-4"
          >

            {/* Course Name */}
            <input
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              placeholder="Course Name"
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />

            {/* Course Code */}
            <input
              name="courseCode"
              value={course.courseCode}
              onChange={handleChange}
              placeholder="Course Code"
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {/* Duration */}
            <input
              name="duration"
              value={course.duration}
              onChange={handleChange}
              placeholder="Duration"
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {/* Fees */}
            <input
              name="fees"
              type="number"
              value={course.fees}
              onChange={handleChange}
              placeholder="Fees"
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {/* Description */}
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              placeholder="Description"
              rows={4}
              className="border border-gray-300 p-3 rounded col-span-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {/* Save Button */}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 rounded transition col-span-2"
            >
              Save Changes
            </button>

          </form>
        </div>
      </div>

      {/* Toast */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
}
