import React from "react";

function Card({ title, icon, value, className = " text-indigo-600" }) {
  return (
    <div className="flex items-center gap-5 p-5 bg-white rounded-lg shadow-md">
      <div
        className={`p-2 h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 shadow-sm ${className}`}
      >
        {icon}
      </div>
      <div>
        <h2 className="font-semibold text-slate-700">{title}</h2>
        <h2 className="text-xl font-bold text-slate-800">{value}</h2>
      </div>
    </div>
  );
}

export default Card;
