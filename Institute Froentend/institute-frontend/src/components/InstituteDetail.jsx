import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function InstituteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [institute, setInstitute] = useState(null);
  const [courses, setCourses] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

 const formatTime = (time) => {
  if (!time) return "";

  // Handles "19:00:00" OR "19:00"
  const parts = time.split(":");
  const hour = parseInt(parts[0], 10);
  const minute = parts[1];

  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minute} ${period}`;
};




  useEffect(() => {
    setLoading(true);

    axios.get(`http://localhost:8090/api/institutes/${id}`)
      .then(res => setInstitute(res.data));

    axios.get(`http://localhost:8090/api/institutes/${id}/media`)
      .then(res => setMedia(res.data))
      .catch(() => setMedia([]));

    axios.get(`http://localhost:8090/api/institutes/${id}/courses`)
      .then(async res => {
        const updated = await Promise.all(
          res.data.map(async c => {
            try {
              const s = await axios.get(
                `http://localhost:8090/api/institutes/${id}/courses/${c.id}/syllabus`
              );
              return { ...c, syllabus: s.data };
            } catch {
              return { ...c, syllabus: [] };
            }
          })
        );
        setCourses(updated);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!institute) return <p className="text-center py-20">Institute not found</p>;

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* ================= HERO ================= */}
      <div className="relative h-[380px] bg-gradient-to-br from-neutral-900 via-amber-900 to-black text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto h-full flex items-end p-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl max-w-3xl">
            <button
              onClick={() => navigate(-1)}
              className="text-sm underline mb-2"
            >
              ← Back
            </button>

            <h1 className="text-4xl font-extrabold">
              {institute.name}
            </h1>

            <p className="text-gray-200 mt-2">
              {institute.description}
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <Badge>{institute.category}</Badge>
              <Badge>{institute.accreditation}</Badge>
              <Badge>Fees ₹{institute.fees}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-3 space-y-8">

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat title="Courses" value={courses.length} />
            <Stat title="Branches" value={institute.branches?.length || 1} />
            <Stat title="Facilities" value={institute.facilities?.split(",").length || 5} />
            <Stat title="Rating" value="4.6 ★" />
          </div>

          {/* BRANCHES */}
          {institute.branches?.length > 0 && (
            <Section title="Branches">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {institute.branches.map((b, i) => (
                  <div key={i} className="border rounded-xl p-4 hover:shadow">
                    <p className="font-semibold">{b.branchName}</p>
                    <p className="text-sm text-gray-600">{b.address}</p>
                    <p>{b.city}, {b.state}</p>
                    <p className="text-sm">{b.phone}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* GALLERY */}
          {media.length > 0 && (
            <Section title="Gallery">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {media.map(m => (
                  <div
                    key={m.id}
                    className="group relative rounded-2xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={m.imageUrl}
                      alt=""
                      className="h-64 w-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* COURSES */}
          <Section title="Courses Offered">
            {courses.length === 0 ? (
              <p className="text-gray-500">No courses available</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {courses.map(course => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl shadow-xl p-6 hover:-translate-y-1 transition"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">
                        {course.courseName}
                      </h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                        ₹{course.fees}
                      </span>
                    </div>

                    <p className="text-gray-600 mt-2">
                      {course.description}
                    </p>

                    <p className="mt-3 text-sm">
                      <b>Duration:</b> {course.duration}
                    </p>

                    {/* SYLLABUS */}
                    <div className="mt-4 border-l-4 border-amber-700 pl-4 space-y-3">
                      {course.syllabus.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No syllabus available
                        </p>
                      ) : (
                        course.syllabus.map(s => (
                          <div key={s.id}>
                            <p className="font-semibold">{s.topicName}</p>
                            <p className="text-sm text-gray-600">
                              {s.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {s.duration}
                            </p>
                          </div>
                        ))
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>

        {/* RIGHT STICKY INFO */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-amber-800">
              Institute Info
            </h3>

            <InfoRow label="Timings">
              {formatTime(institute.openTime)} – {formatTime(institute.closeTime)}
            </InfoRow>

            <InfoRow label="Phone">
              {institute.phone1}
            </InfoRow>

            <InfoRow label="Email">
              {institute.email}
            </InfoRow>

            <InfoRow label="Facilities">
              {institute.facilities}
            </InfoRow>

            <a
              href={institute.website}
              target="_blank"
              rel="noreferrer"
              className="block mt-5 bg-amber-700 hover:bg-amber-800 text-white text-center py-2 rounded-lg font-semibold"
            >
              Visit Website
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= REUSABLE UI ================= */

const Section = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
    {children}
  </span>
);

const Stat = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-4 text-center">
    <p className="text-2xl font-bold text-amber-800">{value}</p>
    <p className="text-sm text-gray-500">{title}</p>
  </div>
);

const InfoRow = ({ label, children }) => (
  <p className="flex justify-between text-sm mb-3">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold text-right">{children}</span>
  </p>
);
