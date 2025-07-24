import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
// import videoDemo from "../../public/assets/images/video-thumbnail.png";

export const WatchDemo = () => {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate("/splash-dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="my-0 flex h-screen w-xl flex-col justify-center rounded-lg bg-white px-10 py-8 shadow-md md:max-w-xl">
        <h1 className="mb-2 text-xl font-semibold md:text-3xl">
          Watch Tutorial on how to use the ReTaler App
        </h1>
        <p className="mb-1 text-sm text-gray-600 md:text-lg">
          Take a few minutes to explore how the app works. From setup to
          features, we've got you covered.
        </p>
        <ProgressBar currentStep={4} />
        <div className="w-full">
          <img
            src="/assets/images/video-thumbnail.png"
            alt="Video Demo"
            className="mt-2 h-[300px] w-[500px] object-cover"
          />
        </div>
        <Button className="mt-5 w-full">Watch video</Button>
        <button
          onClick={handleSkip}
          type="button"
          className="mx-auto mt-3 block text-sm text-blue-600 hover:underline"
        >
          Skip for later
        </button>
      </div>
    </div>
  );
};
