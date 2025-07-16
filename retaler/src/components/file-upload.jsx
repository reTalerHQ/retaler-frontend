import { UploadSimple } from "phosphor-react";
import React, { useState } from "react";

const FileUpload = ({ file, handleFileChange, description }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const onChange = (e) => {
    if (e.target.files?.length > 0) {
      handleFileChange(e.target.files[0]);
    }
  };

  return (
    <label
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 transition-colors ${isDragging ? "bg-[#CACDF6]" : "bg-gray-100"} `}
    >
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="rounded-full bg-white p-3">
          <UploadSimple className="text-2xl" />
        </div>
        <p className="text-sm font-semibold">Drag or drop image</p>
        {description && (
          <div className="space-y-0.5 text-xs text-gray-600">{description}</div>
        )}
      </div>
    </label>
  );
};

export default FileUpload;
