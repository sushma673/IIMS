import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Background image URL
const BG_IMAGE =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1920&auto=format&fit=crop";

export default function Syllabus() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const instRes = await axios.get(
        "http://localhost:8090/api/institutes"
      );

      const institutes = instRes.data;

      const finalData = await Promise.all(
        institutes.map(async (inst) => {
          const courseRes = await axios.get(
            `http://localhost:8090/api/institutes/${inst.id}/courses`
          );

          const courses = await Promise.all(
            courseRes.data.map(async (course) => {
              try {
                const sylRes = await axios.get(
                  `http://localhost:8090/api/institutes/${inst.id}/courses/${course.id}/syllabus`
                );

                return {
                  ...course,
                  syllabus: sylRes.data
                };
              } catch {
                return { ...course, syllabus: [] };
              }
            })
          );

          return {
            instituteId: inst.id,
            instituteName: inst.name,
            courses
          };
        })
      );

      setData(finalData);
      setLoading(false);
    } catch {
      toast.error("Failed to load syllabus");
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (instituteId, syllabusId) => {
    if (!window.confirm("Delete this syllabus?")) return;

    try {
      await axios.delete(
        `http://localhost:8090/api/institutes/${instituteId}/courses/syllabus/${syllabusId}`
      );

      toast.success("Syllabus deleted successfully!");
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (instituteId, courseId, syllabusId) => {
    navigate(
      `/edit-syllabus/${instituteId}/${courseId}/${syllabusId}`
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading syllabus...
      </div>
    );

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-6"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-white">
          All Syllabus
        </h2>

        {data.map((inst) => (
          <div key={inst.instituteId} className="mb-8">

            <h3 className="text-xl font-bold text-yellow-400">
              {inst.instituteName}
            </h3>

            {inst.courses.map((course) => (
              <div
                key={course.id}
                className="ml-6 mt-4 bg-white p-4 rounded shadow"
              >
                <h4 className="font-semibold mb-2">
                  Course: {course.courseName}
                </h4>

                {course.syllabus.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No syllabus added
                  </p>
                )}

                {course.syllabus.map((s) => (
                  <div key={s.id} className="ml-4 mt-2">

                    <b>{s.topicName}</b> – {s.description}

                    <div className="space-x-4 mt-1">
                      {/* EDIT */}
                      <button
                        className="text-blue-600 underline text-xs"
                        onClick={() =>
                          handleEdit(
                            inst.instituteId,
                            course.id,
                            s.id
                          )
                        }
                      >
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        className="text-red-600 underline text-xs"
                        onClick={() =>
                          handleDelete(
                            inst.instituteId,
                            s.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}