import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

const Input = forwardRef(
  (
    {
      className,
      type = "text",
      leftIcon,
      rightIcon,
      label,
      error,
      id,
      showError = true,
      ...props
    },
    ref,
  ) => {
    const handleWheel = (event) => {
      if (type === "number") {
        event.currentTarget.blur();
      }
    };

    const handleKeyDown = (event) => {
      if (
        type === "number" &&
        (event.key === "ArrowUp" || event.key === "ArrowDown")
      ) {
        event.preventDefault();
      }
    };

    return (
      <div className="flex w-full flex-col gap-3">
        {label ? <Label htmlFor={id}>{label}</Label> : null}
        <div className="relative">
          {leftIcon ? (
            <span className="text-fade absolute top-[1.75px] bottom-[1.75px] left-[1.5px] z-10 flex items-center justify-center">
              {leftIcon}
            </span>
          ) : null}
          <input
            type={type}
            className={cn(
              `focus-visible:ring-primary flex h-9.5 w-full rounded-sm border border-[#BBBBBB] px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-300 focus:border-none focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                leftIcon ? "pl-5" : ""
              } ${rightIcon ? "pr-5" : ""}`,
              type === "number" && "hide-number-arrows",
              className,
            )}
            ref={ref}
            id={id}
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
            {...props}
          />
          {rightIcon ? (
            <span className="text-fade absolute top-[50%] right-1 z-20 -translate-y-[50%]">
              {rightIcon}
            </span>
          ) : null}
        </div>
        {showError && (
          <p className="mt-0.5 h-1 text-[10px] text-red-500">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
