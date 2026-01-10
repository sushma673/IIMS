import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Courses() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstitutesAndCourses();
  }, []);

  const fetchInstitutesAndCourses = async () => {
    try {
      // 1️⃣ Get all institutes
      const instituteRes = await axios.get("http://localhost:8088/api/institutes", {
        withCredentials: true, // ✅ if backend uses cookies/session
      });
      const institutesData = instituteRes.data;

      // 2️⃣ For each institute, get its courses
      const institutesWithCourses = await Promise.all(
        institutesData.map(async (inst) => {
          const courseRes = await axios.get(
            `http://localhost:8088/api/institutes/${inst.id}/courses`,
            { withCredentials: true }
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
    }
  };

  if (loading) {
    return <div className="p-6">Loading courses...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Courses</h1>

      {institutes.map((inst, index) => (
        <div key={index} className="mb-6">
          {/* Institute Info */}
          <h2 className="text-xl font-semibold text-orange-600 mb-1">
            Institute ID: <span className="text-black">{inst.instituteId}</span>
          </h2>
          <h3 className="text-lg font-semibold text-blue-700 mb-3">
            Name: {inst.instituteName}
          </h3>

          {/* Courses */}
          {inst.courses.length === 0 ? (
            <p className="text-gray-500 ml-4">No courses available</p>
          ) : (
            <ul className="ml-6 list-disc">
              {inst.courses.map((course) => (
                <li key={course.id} className="mb-1">
                  <span className="font-medium">{course.courseName}</span>
                  {course.duration && (
                    <span className="text-gray-500"> – {course.duration}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}