import React from "react";
import clsx from "clsx";

export const ProgressBar = ({ currentStep }) => {
  const totalSteps = 4; // Adjust based on your total steps
  return (
    <div className="my-4 flex w-full gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isActive = step <= currentStep;

        return (
          <div
            key={step}
            className={clsx(
              "h-[2px] flex-1 rounded-full transition-all duration-200 ease-in-out",
              {
                "bg-blue-500": isActive,
                "bg-gray-300": !isActive,
              },
            )}
          />
        );
      })}
    </div>
  );
};
