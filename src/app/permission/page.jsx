"use client";
import SignOutButton from "@/components/LogOutButton";
import React from "react";

function ProfileUnderProcessing() {
  return (
    <div className="flex flex-col justify-center w-full items-center h-screen bg-gray-100 text-center p-4">
      <div className="text-xl mb-6 text-gray-700">
        Your profile is currently under processing. Please contact the
        administration for further assistance.
      </div>
      <div className="py-2 px-4 bg-yellow-100 rounded-full text-2xl font-bold">
        <SignOutButton />
      </div>
    </div>
  );
}

export default ProfileUnderProcessing;
