import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function InstituteCard({ institute }) {
  return (
    <Link to={`/institute/${institute.id}`} className="block">
      <div className="flex bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full">

        {/* Left Image */}
        <div className="w-48 h-40 flex-shrink:0">
          {institute.images && institute.images.length > 0 ? (
            <img
              src={institute.images[0]}
              alt={institute.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex flex-col justify-between p-4 flex-1">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {institute.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {institute.category}
            </p>

            <p className="text-sm text-gray-600 flex items-center gap-1 mt-2">
              <FaMapMarkerAlt className="text-red-500" />
              {institute.city}
            </p>
          </div>

          <div className="mt-4">
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}