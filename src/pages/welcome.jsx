import React from "react";

import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

{
  /* <Globe size={32} /> */
}

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="my-0 flex h-screen w-xl flex-col items-center justify-center space-y-4 rounded-lg bg-white p-8 shadow-md md:my-6 md:max-w-xl">
        <h1 className="font-trap mb-12 text-3xl font-bold text-gray-800">
          Welcome to ReTaler
        </h1>
        <div className="mb-6 rounded-full bg-blue-50 p-3">
          <Globe size={32} className="text-gray-800" />
        </div>
        <label className="text-lg font-semibold">Select language</label>

        <Select>
          <SelectTrigger className="px-10 py-6 text-lg">
            <SelectValue
              placeholder="Choose your language"
              className="text-gray-800"
            />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="yoruba">Yoruba</SelectItem>
            <SelectItem value="hausa">Hausa</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={() => navigate("/signup")}
          className="mt-8 w-56 rounded-lg bg-blue-700 px-10 py-6 text-lg text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
