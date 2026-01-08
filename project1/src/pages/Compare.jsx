import React, { useState } from "react";
import { Search, X } from "lucide-react";

export default function Compare() {
  const [institute1, setInstitute1] = useState("");
  const [institute2, setInstitute2] = useState("");

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Compare Institute</h1>

      {/* Compare Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

        {/* Institute 1 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-xl mb-3">Institute 1</h2>

          <div className="flex items-center bg-gray-100 p-3 rounded-xl">
            <Search className="mr-2 text-blue-600" />
            <input
              className="outline-none w-full"
              placeholder="Search or enter institute name…"
              value={institute1}
              onChange={(e) => setInstitute1(e.target.value)}
            />
            {institute1 && (
              <X className="cursor-pointer" onClick={() => setInstitute1("")} />
            )}
          </div>

          {/* Show result preview */}
          {institute1 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <p className="font-semibold">{institute1}</p>
              <p className="text-sm text-gray-600">Institute Info</p>
            </div>
          )}
        </div>

        {/* Institute 2 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-xl mb-3">Institute 2</h2>

          <div className="flex items-center bg-gray-100 p-3 rounded-xl">
            <Search className="mr-2 text-blue-600" />
            <input
              className="outline-none w-full"
              placeholder="Search or enter college name…"
              value={institute2}
              onChange={(e) => setInstitute2(e.target.value)}
            />
            {institute2 && (
              <X className="cursor-pointer" onClick={() => setInstitute2("")} />
            )}
          </div>

          {/* Show result preview */}
          {institute2 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <p className="font-semibold">{college2}</p>
              <p className="text-sm text-gray-600">Institute Info</p>
            </div>
          )}
        </div>

      </div>

      {/* Compare Button */}
      {institute1 && institute2 && (
        <div className="text-center mt-6">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg">
            Show Full Comparison
          </button>
        </div>
      )}
    </div>
  );
}
