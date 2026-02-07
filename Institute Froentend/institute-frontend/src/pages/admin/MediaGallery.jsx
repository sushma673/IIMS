import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// NEW background image for MediaGallery
const BG_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1920&auto=format&fit=crop";

export default function MediaGallery() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInstitutesAndMedia();
  }, []);

  const fetchInstitutesAndMedia = async () => {
    try {
      const instituteRes = await axios.get(
        "http://localhost:8090/api/institutes"
      );

      const institutesData = instituteRes.data;

      const institutesWithMedia = await Promise.all(
        institutesData.map(async (inst) => {
          try {
            const mediaRes = await axios.get(
              `http://localhost:8090/api/institutes/${inst.id}/media`
            );

            return {
              instituteId: inst.id,
              instituteName: inst.name,
              media: mediaRes.data,
            };
          } catch {
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
    } catch {
      setError("Failed to load institutes");
      setLoading(false);
    }
  };

  const handleDeleteMedia = async (instituteId, mediaId) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await axios.delete(
        `http://localhost:8090/api/institutes/${instituteId}/media/${mediaId}`
      );

      toast.success("Image deleted successfully ✅");
      fetchInstitutesAndMedia();
    } catch {
      toast.error("Failed to delete image ❌");
    }
  };

  if (loading)
    return <div className="p-6 text-white">Loading media...</div>;
  if (error)
    return <div className="p-6 text-red-400">{error}</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-6"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative">
        <ToastContainer position="top-right" autoClose={3000} />

        <h1 className="text-2xl font-bold mb-6 text-white">
          Institute Media
        </h1>

        {institutes.map((inst) => (
          <div key={inst.instituteId} className="mb-8">
            <h2 className="text-xl font-semibold text-orange-400 mb-1">
              Institute ID:{" "}
              <span className="text-white">{inst.instituteId}</span>
            </h2>

            <h3 className="text-lg font-semibold text-blue-300 mb-3">
              Name: {inst.instituteName}
            </h3>

            {inst.media.length === 0 ? (
              <p className="text-gray-300 ml-4">
                No media available
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-4">
                {inst.media.map((item) => (
                  <div
                    key={item.id}
                    className="border border-white/20 bg-white rounded shadow p-2 relative"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.caption || "Institute Media"}
                      className="w-full h-40 object-cover rounded"
                    />

                    <button
                      onClick={() =>
                        handleDeleteMedia(
                          inst.instituteId,
                          item.id
                        )
                      }
                      className="absolute top-1 right-1 text-red-600 font-bold bg-white rounded-full px-1"
                    >
                      ❌
                    </button>

                    {item.caption && (
                      <p className="text-sm text-gray-600 mt-2">
                        {item.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}