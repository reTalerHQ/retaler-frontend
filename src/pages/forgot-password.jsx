import React from "react";
import { Input } from "../components/ui/input";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BASE_URL } from "@/constants/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/v1/users/reset-password`, data);
      toast.success(res.data.detail);
      navigate("/reset-password");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <section className="flex items-center justify-center bg-blue-50">
        <div className="flex h-screen w-xl flex-col justify-center rounded-lg bg-white px-10 py-8 shadow-md md:my-1 md:max-w-xl">
          <h1 className="text-[20px] font-semibold md:text-[36px] md:font-bold">
            Reset Your Password
          </h1>
          <p className="text-[14px] font-normal text-[#373636] md:text-[20px]">
            Enter your email to receive a password reset link
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label htmlFor="email" className="text-[16px] font-semibold">
                Email Address
              </label>
              <Input
                type="email"
                // required={true}
                placeholder="Enter your email address"
                className="bg-[#EFEEEE]"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <button className="mt-5 mb-3.5 h-10 w-full cursor-pointer rounded-[7px] bg-[#375ED9] text-white">
              {isLoading ? "Sending..." : "Send reset email"}
              {/* Send reset email */}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;

// somoh62535@dekpal.com
