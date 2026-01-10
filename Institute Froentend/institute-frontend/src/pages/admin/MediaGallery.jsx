import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MediaGallery() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInstitutesAndMedia();
  }, []);

  const fetchInstitutesAndMedia = async () => {
    try {
      // ✅ Fetch all institutes
      const instituteRes = await axios.get("http://localhost:8088/api/institutes");
      const institutesData = instituteRes.data;

      // ✅ For each institute, fetch its media
      const institutesWithMedia = await Promise.all(
        institutesData.map(async (inst) => {
          try {
            const mediaRes = await axios.get(
              `http://localhost:8088/api/institutes/${inst.id}/media`
            );

            return {
              instituteId: inst.id,
              instituteName: inst.name,
              media: mediaRes.data,
            };
          } catch (mediaError) {
            console.error(`Error loading media for institute ${inst.id}`, mediaError);
            return {
              instituteId: inst.id,
              instituteName: inst.name,
              media: [],
            };
          }
        })
      );

      setInstitutes(institutesWithMedia);
      setLoading(false);
    } catch (err) {
      console.error("Error loading institutes", err);
      setError("Failed to load institutes");
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading media...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Institute Media</h1>

      {institutes.map((inst) => (
        <div key={inst.instituteId} className="mb-8">
          {/* Institute Info */}
          <h2 className="text-xl font-semibold text-orange-600 mb-1">
            Institute ID: <span className="text-black">{inst.instituteId}</span>
          </h2>
          <h3 className="text-lg font-semibold text-blue-700 mb-3">
            Name: {inst.instituteName}
          </h3>

          {/* Media Gallery */}
          {inst.media.length === 0 ? (
            <p className="text-gray-500 ml-4">No media available</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-4">
              {inst.media.map((item) => (
                <div key={item.id} className="border rounded shadow p-2">
                  <img
                    src={item.imageUrl}
                    alt={item.caption || "Institute Media"}
                    className="w-full h-40 object-cover rounded"
                  />
                  {item.caption && (
                    <p className="text-sm text-gray-600 mt-2">{item.caption}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}