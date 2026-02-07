import React, { useEffect, useState } from "react";
import axios from "axios";
import InstituteCards from "../../components/InstituteCards";

// ✅ Background image URL
const BG_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop";

export default function AllInstitutes() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/institutes")
      .then((res) => {
        setInstitutes(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-center text-lg mt-10 text-gray-500">
        Loading institutes...
      </p>
    );

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('${BG_IMAGE}')` }}
    >
      {/* Dark overlay */}
      <div className="min-h-screen bg-black/70 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">
            All Institutes
          </h2>

          <InstituteCards institutes={institutes} />
        </div>
      </div>
    </div>
  );
}