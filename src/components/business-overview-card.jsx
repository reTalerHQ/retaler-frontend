import React from "react";

export const BusinessOverviewCard = ({ title, icon, count, color, border }) => {
  // always use a dark text color on light mode and dark mode as requested
  const textColor = "#000000";

  return (
    <div
      style={{ backgroundColor: color, border: `0.5px solid ${border}` }}
      className="flex flex-col items-start rounded-xl px-4 py-2.5"
    >
      <div className="mr-auto mb-2 flex aspect-square h-10 items-center justify-center rounded-full bg-white">
        {icon}
      </div>
      <p style={{ color: textColor }} className="font-sm">{title}</p>
      <h2 style={{ color: textColor }} className="mt-1 text-xl font-semibold">{count}</h2>
    </div>
  );
};
