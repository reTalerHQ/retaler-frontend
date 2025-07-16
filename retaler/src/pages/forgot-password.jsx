import React from "react";
import { Input } from "../components/ui/input";

const ForgotPassword = () => {
  return (
    <>
      <section className="my-[50px] flex items-center justify-center md:my-[40px]">
        <section className="h-80 w-150 flex items-center justify-center md:h-100">
          <div className="h-65 w-86 md:h-70 md:w-120">
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
      </section>
    </>
  );
};

export default ForgotPassword;
