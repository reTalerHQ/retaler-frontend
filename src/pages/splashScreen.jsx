import React from "react";
import { useIsMobile } from "@/hook/use-is-mobile";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SplashScreen = () => {
  const isMobile = useIsMobile();
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        navigate("/welcome");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, navigate]);

  if (!isMobile) {
    navigate("/welcome");
    return null;
  }

  return (
    showSplash && (
      <div className="flex h-screen flex-col items-center justify-center bg-white text-center">
        <div className="animate-pulse">
          <img
            src="/assets/images/retaler-logo.svg"
            alt="ReTaler Logo"
            className="mx-auto w-72"
          />
        </div>
        <div className="text-center text-sm">
          <p className="font-trap text-center text-lg font-semibold text-gray-500">
            Track, Analyze, Grow...
          </p>
        </div>
      </div>
    )
  );
};
