import { useEffect, useState } from "react";
import axios from "axios";
import InstituteCards from "../../components/InstituteCards";

export default function AllInstitutes() {
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/institutes")
      .then((res) => setInstitutes(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Manage Institutes
      </h1>

      <InstituteCards institutes={institutes} />
    </div>
  );
}
