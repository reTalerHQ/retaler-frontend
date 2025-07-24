import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Yup validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().required("Role is required"),
});

export const InviteStaff = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      role: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Staff invited:", data);
    // Here you'd normally call your invite API
    reset();
    navigate("/watch-demo");
  };

  const handleSkip = () => {
    navigate("/watch-demo");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="my-0 flex h-screen w-xl flex-col justify-center rounded-lg bg-white px-10 py-8 shadow-md md:max-w-xl">
        <h1 className="mb-2 text-lg font-semibold md:text-3xl">
          Invite Staff Members
        </h1>
        <p className="mb-4 text-sm text-gray-600 md:text-lg">
          Add team members by email and assign their roles.
        </p>

        <ProgressBar currentStep={3} />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm">Email Address</label>
            <Input
              type="email"
              placeholder="janedoe@gmail.com"
              {...register("email")}
              className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:border focus:border-gray-400 focus:bg-white focus:outline-none md:text-base"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm">Role</label>
            <select
              {...register("role")}
              className="w-full rounded border-0 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:border-gray-400 focus:bg-white focus:outline-none"
            >
              <option value="">Select Role</option>
              <option value="Manager">Manager</option>
              <option value="Cashier">Cashier</option>
              <option value="Staff">Staff</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          <Button type="submit" className="mt-4 w-full">
            Send Invite
          </Button>

          <button
            type="button"
            onClick={handleSkip}
            className="mx-auto mt-3 block text-sm text-blue-600 hover:underline"
          >
            Skip for later
          </button>
        </form>
      </div>
    </div>
  );
};
