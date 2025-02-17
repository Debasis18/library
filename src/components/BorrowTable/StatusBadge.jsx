import React from "react";

function StatusBadge({ status, dueDate }) {
  const getStatusClasses = () => {
    switch (status.toLowerCase()) {
      case "borrowed":
        return "bg-violet-100 text-violet-800 ";
      case "returned":
        return "bg-green-100 text-green-800 ";
      case "overdue":
        return "bg-red-200 text-red-500 ";
      default:
        return "bg-yellow-100 text-yellow-800 ";
    }
  };

  if (dueDate && new Date(dueDate) < new Date() && status !== "returned") {
    const day = Math.floor(
      (new Date() - new Date(dueDate)) / (1000 * 60 * 60 * 24)
    );
    if (day > 0) {
      status = "OVERDUE";
    }
  }

  return (
    <p
      className={`px-3 w-fit py-2 text-center rounded-full  shadow font-bold ${getStatusClasses()}`}
    >
      {status}
    </p>
  );
}

export default StatusBadge;
