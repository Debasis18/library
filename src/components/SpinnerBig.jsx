"use client";
import React, { useState, useEffect } from "react";

function SpinnerBig() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Please wait, we are validating your data...";

  useEffect(() => {
    let intervalId;

    if (displayText.length < fullText.length) {
      intervalId = setInterval(() => {
        setDisplayText((prev) => fullText.substring(0, prev.length + 1));
      }, 30);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [displayText, fullText]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100">
      <div className="animate-spin rounded-full h-20 w-20 border-t-8 border-b-8 border-blue-500 mb-4" />
      <p className="text-2xl font-medium text-gray-700">{displayText}</p>
    </div>
  );
}

export default SpinnerBig;
