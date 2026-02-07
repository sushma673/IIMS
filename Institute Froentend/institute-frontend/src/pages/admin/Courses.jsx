import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// 🔹 Background image URL
const BG_IMAGE =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1920&auto=format&fit=crop";

export default function Courses() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstitutesAndCourses();
  }, []);

  const fetchInstitutesAndCourses = async () => {
    try {
      const instituteRes = await axios.get(
        "http://localhost:8090/api/institutes"
      );

      const institutesData = instituteRes.data;

      const institutesWithCourses = await Promise.all(
        institutesData.map(async (inst) => {
          const courseRes = await axios.get(
            `http://localhost:8090/api/institutes/${inst.id}/courses`
          );

          return {
            instituteId: inst.id,
            instituteName: inst.name,
            courses: courseRes.data,
          };
        })
      );

      setInstitutes(institutesWithCourses);
      setLoading(false);
    } catch (error) {
      console.error("Error loading courses ❌", error);
      setLoading(false);
      toast.error("Failed to load courses");
    }
  };

  // DELETE COURSE
  const handleDeleteCourse = async (instituteId, courseId) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(
        `http://localhost:8090/api/institutes/${instituteId}/courses/${courseId}`
      );

      toast.success("Course deleted successfully!");
      fetchInstitutesAndCourses();
    } catch {
      toast.error("Failed to delete course");
    }
  };

  // EDIT COURSE
  const handleEditCourse = (instituteId, courseId) => {
    navigate(`/edit-course/${instituteId}/${courseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading courses...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('${BG_IMAGE}')` }}
    >
      {/* Overlay */}
      <div className="min-h-screen bg-black/70 py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl p-6">

          <h2 className="text-2xl font-bold mb-4">Courses</h2>

          <table className="w-full text-left border-collapse">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="py-3 px-2">Institute</th>
                <th className="px-2">Course</th>
                <th className="px-2">Duration</th>
                <th className="px-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {institutes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No courses found
                  </td>
                </tr>
              ) : (
                institutes.map((inst) =>
                  inst.courses.length === 0 ? (
                    <tr key={inst.instituteId}>
                      <td colSpan="4" className="py-3 px-2 text-gray-500">
                        No courses for {inst.instituteName}
                      </td>
                    </tr>
                  ) : (
                    inst.courses.map((course) => (
                      <tr
                        key={course.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-2 font-medium">
                          {inst.instituteName}
                        </td>

                        <td className="px-2">{course.courseName}</td>

                        <td className="px-2">
                          {course.duration || "N/A"}
                        </td>

                        <td className="px-2">
                          <button
                            onClick={() =>
                              handleEditCourse(
                                inst.instituteId,
                                course.id
                              )
                            }
                            className="text-blue-600 hover:underline mr-3"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteCourse(
                                inst.instituteId,
                                course.id
                              )
                            }
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )
                )
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}