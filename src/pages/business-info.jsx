import React from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";

// yup schema validation
const schema = yup.object().shape({
  businessName: yup.string().required("Business name is required"),
  businessCategory: yup.string().required("Business Category is required"),
  staffSize: yup.string().required("Please select a staff size"),
});

export const BusinessInfo = () => {
  const navigate = useNavigate();
  const [selectedStaff, setSelectedStaff] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      businessName: "",
      businessCategory: "",
      staffSize: "",
    },
  });

  const staffSize = ["None", "1-2", "3-6", "5+"];

  const onSubmit = (data) => {
    console.log("business info submitted:", data);
    navigate("/invite-staff");
  };

  const handleStaffSelect = (value) => {
    setSelectedStaff(value);
    setValue("staffSize", value, { shouldValidate: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="my-0 flex h-screen w-xl flex-col justify-center rounded-lg bg-white px-10 py-8 shadow-md md:my-1 md:max-w-xl">
        <h1 className="mb-2 text-lg font-semibold md:text-3xl">
          Tell Us About Your Business
        </h1>
        <p className="mb-2 text-sm text-gray-600 md:text-lg">
          Let us know more about your business.
        </p>
        <ProgressBar currentStep={2} />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm md:text-base">
              Business name
            </label>
            <Input
              type="text"
              placeholder="Enter your Business name"
              className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:border focus:border-gray-400 focus:bg-white focus:outline-none md:text-base"
              {...register("businessName")}
            />
            {errors.businessName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.businessName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm md:text-base">
              Business category
            </label>
            <Input
              type="text"
              placeholder="Choose your business category"
              className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:border focus:border-gray-400 focus:bg-white focus:outline-none md:text-base"
              {...register("businessCategory")}
            />
            {errors.businessCategory && (
              <p className="mt-1 text-sm text-red-500">
                {errors.businessCategory.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm md:text-base">
              How many staff do you have?
            </label>
            <div className="flex gap-4">
              {staffSize.map((option) => (
                <Button
                  type="button"
                  className={clsx(
                    "bg-gray-200 text-gray-700",
                    selectedStaff === option &&
                      "bg-blue-600 font-semibold text-white",
                  )}
                  onClick={() => handleStaffSelect(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            {errors.staffSize && (
              <p className="mt-1 text-sm text-red-500">
                {errors.staffSize.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={!isValid}
            className={clsx(
              "mt-6 w-full text-white transition-colors",
              "disabled:bg-blue-700",
              isValid ? "bg-blue-600 hover:bg-blue-700" : "",
            )}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};
