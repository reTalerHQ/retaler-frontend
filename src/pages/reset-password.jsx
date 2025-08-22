import { Input } from "../components/ui/input";
import { BASE_URL } from "@/constants/api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import { useSearchParams } from "react-router-dom";
import { Password } from "phosphor-react";

const ResetPassword = () => {
  const [SearchParams] = useSearchParams();
  // const token = SearchParams.get("token");
  const resetToken = decodeURIComponent(SearchParams.get("token") || "");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    if (!resetToken) {
      toast.error("Invalid or missing reset token");
      return;
    }

    console.log("sending request with token:", resetToken);
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}/v1/users/change-password`,
        {
          password: data.password,
          token: resetToken,
        },
        {
          headers: {
            Authorization: `Bearer ${resetToken}`,
          },
        },
      );
      toast.success(response.data?.detail || " Password changed successfully");
    } catch (error) {
      console.log("full error object:", error);
      console.log("error response:", error.response);
      console.log("error status:", error.response?.status);
      console.log("full data:", error.response?.data);
      const message = error.response?.data?.detail;
      toast.error(message ?? "An error occurred while resetting the password");
    }
  };

  return (
    <>
      <section className="flex min-h-screen items-center justify-center bg-blue-50">
        <div className="flex w-xl flex-col rounded-lg bg-white px-10 py-8 shadow-md md:my-1 md:max-w-xl">
          <h1 className="text-[20px] font-semibold md:text-[36px] md:font-bold">
            Reset Your Password
          </h1>
          <p className="text-[14px] font-normal text-[#373636] md:text-[20px]">
            Enter your new Password
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="text-[16px] font-semibold text-[#373636]"
              >
                New Password
              </label>
              <Input
                type="password"
                // required={true}

                placeholder="Enter your new password"
                className="bg-[#EFEEEE]"
                {...register("password", { required: "Password is required" })}
              />
            </div>

            <div className="mt-4">
              <label className="text-[16px] font-semibold text-[#373636]">
                Confirm Password
              </label>
              <Input
                type="password"
                // required={true}
                placeholder="Confirm your new password"
                className="bg-[#EFEEEE]"
                // {...register("password", { required: "new password required" })}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Password do not match",
                })}
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
            <button
              className="mt-5 mb-3.5 h-10 w-full cursor-pointer rounded-[7px] bg-[#375ED9] text-[16px] font-semibold text-white"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;

// Od12345/l
