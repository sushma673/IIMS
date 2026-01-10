import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../../components/StatCard";
import { FaSchool, FaBook, FaUsers, FaStar } from "react-icons/fa";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    institutes: 0,
    courses: 0,
    users: 0,
    media: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/dashboard/counts")
      .then((res) => {
        setCounts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load dashboard counts");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Overview</h2>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Institutes"
          value={counts.institutes}
          icon={<FaSchool />}
        />
        <StatCard
          title="Courses"
          value={counts.courses}
          icon={<FaBook />}
        />
        <StatCard
          title="Users"
          value={counts.users}
          icon={<FaUsers />}
        />
        <StatCard
          title="Media"
          value={counts.media}
          icon={<FaStar />}
        />
      </div>
    </div>
  );
}
