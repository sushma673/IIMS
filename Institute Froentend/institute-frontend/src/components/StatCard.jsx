import React from "react";

export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 
                    flex items-center justify-between 
                    min-h-[120px]">

      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>

      <div className="text-3xl">
        {icon}
      </div>
    </div>
  );
}
