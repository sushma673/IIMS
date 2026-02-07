import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Background image
const BG_IMAGE =
  "https://tse3.mm.bing.net/th/id/OIP.fTDilYO4VXkM25cI1lKwzAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3.jpg";

export default function EditSyllabus() {

  const { instituteId, courseId, syllabusId } = useParams();
  const navigate = useNavigate();

  const [syllabus, setSyllabus] = useState({
    topicName: "",
    description: "",
    duration: ""
  });

  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  useEffect(() => {

    axios.get(
      `http://localhost:8090/api/institutes/${instituteId}/courses/${courseId}/syllabus`
    )
    .then(res => {

      const found = res.data.find(
        s => s.id === Number(syllabusId)
      );

      if (!found) {
        toast.error("Syllabus not found");
        return;
      }

      // remove fees if backend sends it
      const { topicName, description, duration } = found;

      setSyllabus({
        topicName,
        description,
        duration
      });
    })
    .catch(() => {
      toast.error("Failed to load syllabus");
    })
    .finally(() => setLoading(false));

  }, [instituteId, courseId, syllabusId]);

  // ================= CHANGE =================
  const handleChange = (e) => {
    setSyllabus({
      ...syllabus,
      [e.target.name]: e.target.value
    });
  };

  // ================= UPDATE =================
  const handleSave = async (e) => {
    e.preventDefault();

    try {

      await axios.put(
        `http://localhost:8090/api/institutes/${instituteId}/courses/syllabus/${syllabusId}`,
        syllabus   // fees removed
      );

      toast.success("Syllabus updated successfully!");

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
        <div className="relative bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 mb-4"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Edit Syllabus
          </h2>

          <form
            onSubmit={handleSave}
            className="grid grid-cols-2 gap-4"
          >

            {/* Topic Name */}
            <input
              name="topicName"
              value={syllabus.topicName}
              onChange={handleChange}
              placeholder="Topic Name"
              className="border border-gray-300 p-3 rounded col-span-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />

            {/* Duration */}
            <input
              name="duration"
              value={syllabus.duration}
              onChange={handleChange}
              placeholder="Duration"
              className="border border-gray-300 p-3 rounded col-span-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {/* Description */}
            <textarea
              name="description"
              value={syllabus.description}
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
