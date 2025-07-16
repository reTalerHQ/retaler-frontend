import React from "react";
import { Input } from "../components/ui/input";

const ForgotPassword = () => {
  return (
    <>
    <section className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className=" flex w-xl flex-col rounded-lg bg-white px-10 py-8 shadow-md md:my-1 md:max-w-xl ">
            <h1 className="text-[20px] font-semibold md:text-[36px] md:font-bold">
              Reset Your Password
            </h1>
            <p className="text-[14px] font-normal text-[#373636] md:text-[20px]">
              Enter your email to receive a password reset link
            </p>
            <form action="">
              <div className="mt-4">
                <label htmlFor="email" className="text-[16px] font-semibold">
                  Email Address
                </label>
                <Input
                  type="email"
                  required={true}
                  placeholder="Enter your email address"
                  className="bg-[#EFEEEE]"
                />
              </div>
              <button className="mt-5 mb-3.5 h-10 w-full cursor-pointer rounded-[7px] bg-[#375ED9]">
                Send reset email
              </button>
            </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
