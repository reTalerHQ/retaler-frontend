import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

import React from "react";

export const GoodbyePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-300 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        {/* Success Icon */}
        {/* <div className="mb-6 text-6xl text-green-500">✅</div> */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-purple-900">
          <Check className="h-8 w-8 text-white" />
        </div>

        {/* Main Heading */}
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">
          Account Successfully Deleted
        </h1>

        {/* Description */}
        <p className="mb-8 leading-relaxed text-gray-600">
          Thank you for using ReTaler. Your account and all data have been
          permanently removed. We wish you success in your business endeavors.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-lg"
          >
            Go to Homepage
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-200 hover:shadow-lg"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};
