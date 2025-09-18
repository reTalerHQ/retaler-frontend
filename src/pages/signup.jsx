import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SocialAuthButton } from "@/components/SocialAuthButton";
// import { AppleLogo, GoogleLogo } from "phosphor-react";
import GoogleIcon from "../assets/google-logo.svg";
import AppleIcon from "../assets/apple-logo.svg";
import { ProgressBar } from "@/components/ProgressBar";
import clsx from "clsx";
import axiosInstance from "@/lib/axios";
import { BASE_URL } from "@/constants/api";
import { toast } from "sonner";
import { TOKEN_IDENTIFIER, USER_INFO_KEY } from "@/constants";
import { Eye, EyeSlash } from "phosphor-react";

// yup validation schema
const schema = yup.object({
  email: yup.string().email("Inavlid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "Minimum of 8 characters")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/[0-9]/, "At least one number")
    .matches(/[\W_]/, "At least one special character"),
});

export const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isLoading },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);
  
  const [criteria, setCriteria] = useState({
    minChar: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  // to update passsword
  useEffect(() => {
    setCriteria({
      minChar: password?.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[\W_]/.test(password),
    });
  }, [password]);

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);

      const rsp = await axiosInstance.post(
        `${BASE_URL}/v1/users/register/`,
        data,
      );

      toast.success(rsp.data.detail);

      const {
        token: { access_token },
        user,
      } = rsp.data;

      sessionStorage.setItem(TOKEN_IDENTIFIER, access_token);
      sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
      navigate("/business-info");
    } catch (error) {
      console.log({ error });
      const message = error.response.data.detail;
      toast.error(message ?? "Something went wrong...");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/v1/users/auth/google/`;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 dark:bg-[#121212]">
      <div className="my-0 flex w-xl flex-col justify-center rounded-lg bg-white px-10 py-8 shadow-md md:my-1 md:max-w-xl dark:bg-[#1e1e1e]">
        <h1 className="mb-2 text-lg font-semibold md:text-3xl">
          Create your Retaler Account
        </h1>
        <p className="mb-2 text-sm text-gray-600 md:text-lg dark:text-white">
          Start by creating your account
        </p>

        {/* progress bar */}
        <ProgressBar currentStep={1} />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-1">
            {/* <label className="mb-1 block text-sm md:text-base">
              Email Adress
            </label> */}
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:border focus:border-gray-400 focus:bg-white focus:outline-none md:text-base dark:bg-[#383838] dark:text-white"
            />
            {errors.email && (
              <p className="w-full text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-1">
            <Input
              label="Username"
              type="text"
              placeholder="Enter your username"
              {...register("username")}
              className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:border focus:border-gray-400 focus:bg-white focus:outline-none md:text-base dark:bg-[#383838] dark:text-white"
            />
            {errors.username && (
              <p className="w-full text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter a valid password"
                className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-red-500 focus:border focus:border-gray-500 focus:bg-white focus:outline-none md:text-base dark:bg-[#383838] dark:text-white"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
                tabIndex={-1}
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mb-4 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* password checklist */}
          {password && (
            <ul className="mt-2 mb-4 space-y-1 text-xs">
              <li
                className={criteria.minChar ? "text-green-600" : "text-red-500"}
              >
                {criteria.minChar ? "✅" : "❌"}Minimum of 8 characters
              </li>

              <li
                className={criteria.upper ? "text-green-600" : -"text-red-500"}
              >
                {criteria.upper ? "✅" : "❌"} 1 Uppercase letter (A-Z)
              </li>

              <li
                className={criteria.lower ? "text-green-600" : "text-red-500"}
              >
                {criteria.lower ? "✅" : "❌"} 1 Lowercase letter (a-z)
              </li>

              <li
                className={criteria.number ? "text-green-600" : "text-red-500"}
              >
                {criteria.number ? "✅" : "❌"} 1 number (0-9)
              </li>

              <li
                className={criteria.special ? "text-green-600" : "text-red-500"}
              >
                {criteria.special ? "✅" : "❌"} 1 special character
                (-@#\$%&^_+=...?/)
              </li>
            </ul>
          )}
          <Button
            type="submit"
            disabled={!isValid}
            className={clsx(
              "w-full transition-colors",
              "disabled:bg-blue-700",
              isValid ? "bg-blue-600 hover:bg-blue-700" : "",
            )}
          >
            {isLoading ? "Submitting" : "Continue"}
          </Button>
        </form>

        <div className="my-4 flex items-center justify-center space-x-2">
          <div className="h-[1px] w-full bg-gray-300"></div>
          <p className="text-gray-600">or</p>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>

        {/* social logins */}
        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-3">
          <SocialAuthButton
            label="Continue with Google"
            icon={GoogleIcon}
            onClick={handleGoogleLogin}
            className="text-sm font-semibold text-blue-700 dark:bg-[#2e2e2e]"
          />
          <SocialAuthButton
            label="Continue with Apple"
            icon={AppleIcon}
            onClick={() => console.log("Apple login")}
            className="text-sm font-semibold text-blue-700 dark:bg-[#2e2e2e]"
          />
        </div>

        {/* bottom login link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Have an Account? {""}
          <Link to="/sign-in" className="font-semibold text-blue-600 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
// <AppleLogo size={32} weight="fill" />
