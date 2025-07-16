import React from "react";
import { useIsMobile } from "@/hook/use-is-mobile";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SplashScreen } from "./splashScreen";

export const RootEntry = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMobile) {
      navigate("/welcome", { replace: true });
    }
  }, [isMobile, navigate]);

  if (isMobile) {
    return <SplashScreen />;
  }

  return null;
};
