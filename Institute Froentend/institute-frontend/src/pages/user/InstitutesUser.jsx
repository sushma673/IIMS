import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import InstituteCards from "../../components/InstituteCards";

export default function InstitutesUser() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get("category"); //  READ CATEGORY

  useEffect(() => {
    fetchInstitutes();
  }, [category]);

  const fetchInstitutes = async () => {
    try {
      setLoading(true);

      let url = "http://localhost:8090/api/institutes";

      //  FILTER BY CATEGORY IF PRESENT
      if (category) {
        url = `http://localhost:8090/api/institutes/category/${encodeURIComponent(
          category
        )}`;
      }

      const res = await axios.get(url);
      console.log("Institutes:", res.data);
      setInstitutes(res.data);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 font-semibold"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">
        {category ? `Institutes for ${category}` : "All Institutes"}
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : institutes.length === 0 ? (
        <p className="text-center text-gray-500">
          No institutes found for this category.
        </p>
      ) : (
        <InstituteCards institutes={institutes} />
      )}
    </div>
  );
}
