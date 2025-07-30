import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

const Textarea = forwardRef((props, ref) => {
  const { className, label, error, id, ...rest } = props;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <Label htmlFor={id} className="mb-0.5">
          {label}
        </Label>
      ) : null}
      <textarea
        className={cn(
          "focus-visible:ring-primary flex min-h-[60px] w-full rounded-md border border-[#BBBBBB] px-3 py-2 text-sm placeholder:text-gray-300 focus:border-none focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        id={id}
        {...rest}
      />
      <p className="mt-0.5 min-h-1 text-[10px] text-red-500">{error}</p>
    </div>
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
