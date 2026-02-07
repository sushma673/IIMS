import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function InstitutesByCategory() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get("category");
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) fetchInstitutes();
  }, [category]);

  const fetchInstitutes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8090/api/institutes/category/${encodeURIComponent(
          category
        )}`
      );
      setInstitutes(res.data);
    } catch (err) {
      console.error("Failed to fetch institutes", err);
      setInstitutes([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/library-background_78899-9388.jpg?w=2000')",
      }}
    >
      {/* Overlay */}
      <div className="min-h-screen bg-black/60">

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-12 text-white">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/home")}
            className="mb-6 text-white font-semibold hover:underline"
          >
            ← Back to Study Goals
          </button>

          {/* TITLE */}
          <h1 className="text-4xl font-bold mb-8">
            {category} Institutes
          </h1>

          {/* EMPTY STATE */}
          {institutes.length === 0 ? (
            <p className="text-lg">
              No institutes available for <b>{category}</b>
            </p>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {institutes.map((inst) => (
                <div
                  key={inst.id}
                  className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {inst.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    Category: <span className="font-semibold">{inst.category}</span>
                  </p>

                  <Link
                    to={`/institute/${inst.id}`}
                    className="inline-block mt-4 text-amber-700 font-semibold hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
