import React from "react";
import { ClipLoader } from "react-spinners";

export const PagePreLoader = () => {
  return (
    <div className="bg-opacity-20 fixed inset-0 z-50 flex items-center justify-center bg-gray-200/40">
      <ClipLoader size={50} color="#375ED9" />
    </div>
  );
};
