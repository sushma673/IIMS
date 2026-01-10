import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function InstituteDetails() {
  const { id } = useParams();
  
  const [institute, setInstitute] = useState(null);
  const [courses, setCourses] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetch Institute Details
    axios
      .get(`http://localhost:8088/api/institutes/${id}`)
      .then((res) => setInstitute(res.data))
      .catch((err) => console.error("Institute error:", err));

    // Fetch Courses
    axios
      .get(`http://localhost:8088/api/institutes/${id}/courses`)
      .then((res) => setCourses(res.data))
      .catch(() => setCourses([]));

    // Fetch Media
    axios
      .get(`http://localhost:8088/api/institutes/${id}/media`)
      .then((res) => setMedia(res.data))
      .catch(() => setMedia([]))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!institute) return <p className="text-center mt-10">Institute not found</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back
      </Link>

      {/* Institute Details */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
        <h1 className="text-3xl font-bold mb-2">{institute.name}</h1>
        <p className="text-gray-600 mb-4">{institute.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p><b>Category:</b> {institute.category}</p>
          <p><b>Accreditation:</b> {institute.accreditation}</p>
          <p><b>Fees:</b> ₹{institute.fees}</p>
          <p><b>Email:</b> {institute.email}</p>
          <p><b>Phone:</b> {institute.phone1} / {institute.phone2}</p>
          <p><b>Timings:</b> {institute.openTime} - {institute.closeTime}</p>
          <p className="md:col-span-2">
            <b>Address:</b> {institute.address}, {institute.city}, {institute.state} - {institute.pincode}
          </p>

          {institute.website && (
            <p className="md:col-span-2">
              <b>Website:</b>{" "}
              <a
                href={institute.website.startsWith("http") ? institute.website : `https://${institute.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {institute.website}
              </a>
            </p>
          )}
        </div>

        {institute.facilities && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Facilities</h3>
            <p>{institute.facilities}</p>
          </div>
        )}

        {institute.benefits && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Benefits</h3>
            <p>{institute.benefits}</p>
          </div>
        )}

        {/* Media Gallery */}
        {media.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {media.map((m) => (
                <div key={m.id} className="rounded-lg overflow-hidden shadow-sm bg-white p-2">
                  {/* IMAGE */}
                  {m.mediaType === "IMAGE" && m.fileUrl && (
                    <img
                      src={m.fileUrl}
                      alt={m.fileName || "Institute Image"}
                      className="w-full h-48 object-cover"
                      onError={(e) => (e.target.src = "/placeholder.png")}
                    />
                  )}

                  {/* VIDEO */}
                  {m.mediaType === "VIDEO" && m.fileUrl && (
                    <video
                      controls
                      className="w-full max-h-64 object-contain bg-black"
                      preload="metadata"
                      onError={(e) => console.error("Video load error:", e)}
                    >
                      {/* Force mp4 type if backend doesn’t send correct MIME */}
                      <source src={m.fileUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}

                  {/* Media Name */}
                  <p className="text-sm text-center mt-2 text-gray-700">{m.fileName}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Courses */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4">Courses Offered</h2>
        {courses.length === 0 ? (
          <p className="text-gray-500">No courses available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition">
                <h3 className="text-lg font-bold">{course.courseName}</h3>
                <p className="text-sm text-gray-600 mb-1">{course.description}</p>
                <p className="text-sm"><b>Duration:</b> {course.duration}</p>
                <p className="text-sm font-semibold">₹{course.fees}</p>

                {course.syllabus && course.syllabus.length > 0 && (
                  <div className="mt-2">
                    <h4 className="font-semibold text-sm mb-1">Syllabus:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {course.syllabus.map((s) => (
                        <li key={s.id}>
                          {s.sequenceNo}. {s.title} ({s.duration}) — {s.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}