import React, { useEffect, useState } from "react";
import axios from "axios";
import InstituteCard from "./InstituteCard";

export default function InstituteCards() {
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/institutes")
      .then((res) => setInstitutes(res.data))
      .catch((err) => console.error("Error fetching institutes:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Institutes
      </h1>

      {/* Vertical List */}
      <div className="max-w-5xl mx-auto space-y-5">
        {institutes.map((inst) => (
          <InstituteCard key={inst.id} institute={inst} />
        ))}
      </div>
    </div>
  );
}