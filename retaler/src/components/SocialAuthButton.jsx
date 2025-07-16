import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SocialAuthButton = ({ icon, label, onClick, className }) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center rounded-md bg-gray-200 transition hover:bg-gray-300",
        className,
      )}
    >
      <img src={icon} alt={`${label} icon`} className="h-4 w-4" />
      <p>{label}</p>
    </Button>
  );
};
