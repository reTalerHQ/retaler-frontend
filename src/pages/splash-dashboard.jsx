import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const SplashDashboard = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="my-0 flex h-screen w-xl flex-col justify-center rounded-lg px-10 py-8 md:max-w-xl">
        <div className="mx-auto mb-4 block md:hidden">
          <img src="/assets/images/retaler-logo.svg" alt="ReTaler-logo" />
        </div>
        <h1 className="mb-4 text-center text-xl font-semibold md:text-3xl">
          Welcome to ReTaler, <br /> Amina Stores
        </h1>
        <p className="mb-4 text-center text-sm text-gray-600 md:text-lg">
          Let's help you manage your products, sales, and staff
        </p>
        <div className="hidden md:block">
          <img
            src="/assets/images/video-demo.png"
            className="mb-6"
            alt="video-demo"
          />
        </div>
        <Button onClick={handleContinue}>Take me to my Dashboard</Button>
      </div>
    </div>
  );
};
