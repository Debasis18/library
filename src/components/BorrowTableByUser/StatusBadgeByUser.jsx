import { fine } from "@/constants/constants";
import React from "react";

function StatusBadge({ status, dueDate }) {
  // Function to determine the styles based on status
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

  let fineAmount;

  if (dueDate && new Date(dueDate) < new Date() && status !== "returned") {
    const day = Math.floor(
      (new Date() - new Date(dueDate)) / (1000 * 60 * 60 * 24)
    );
    if (day > 0) {
      fineAmount = `${day} days :Rs ${day * fine}`;
      status = "OVERDUE";
    }
  }

  return (
    <div
      className={`flex flex-col justify-center  px-3 w-32 py-2  rounded-full items-center shadow font-bold ${getStatusClasses()}`}
    >
      <span> {status}</span>
      <span> {fineAmount}</span>
    </div>
  );
}

export default StatusBadge;
