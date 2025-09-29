import React from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { Navigate } from "react-router-dom";
import { SplashScreen } from "./splashScreen";

export const RootEntry = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <SplashScreen />;
  }

  return <Navigate to="/landing-page" replace />;
};
