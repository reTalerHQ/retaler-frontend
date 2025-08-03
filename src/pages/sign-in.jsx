import React from "react";
import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import GoogleIcon from "../assets/google-logo.svg";
import AppleIcon from "../assets/apple-logo.svg";
import { SocialAuthButton } from "@/components/SocialAuthButton";
import clsx from "clsx";
import axios from "axios";
import { BASE_URL } from "@/constants/api";
import { TOKEN_IDENTIFIER } from "@/constants";

// yup validation schema
const schema = yup.object({
  email: yup.string().email("Inavlid email").required("Email is required"),
  password: yup.string().required("password is required"),
});

const STORAGE_KEY_EMAIL = "email";
const STORAGE_KEY_PASSWORD = "password";

const Signin = () => {
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  // This will load from localStorage
  useEffect(() => {
    const storedEmail =
      JSON.parse(localStorage.getItem(STORAGE_KEY_EMAIL)) || "";
    const storedPassword =
      JSON.parse(localStorage.getItem(STORAGE_KEY_PASSWORD)) || "";

    setValue("email", storedEmail);
    setValue("password", storedPassword);
  }, [setValue]);

  // To save email and password to localStorage
  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      // const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
      const rsp = await axios.post(
        `${BASE_URL}/v1/users/login`,
        data,
        //   , {
        //   headers: {
        //     Authorization: `Bearer ${tokenFromStorage}`,
        //   },
        // }
      );
      const token = rsp.data.token.access_token;
      console.log({ token });
      sessionStorage.setItem(TOKEN_IDENTIFIER, token);
      navigate("/dashboard");
    } catch (error) {
      console.log({ error });
      const status = error.response.status;
      console.log({ status });

      const message = error.response.data.detail;
      alert(message ?? "Something went wrong...");
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <section className="flex min-h-screen items-center justify-center bg-blue-50">
        <div className="flex h-screen w-xl flex-col justify-center rounded-lg bg-white px-10 py-8 shadow-md md:my-1 md:max-w-xl">
          <h1 className="text-[20px] font-semibold md:text-[36px] md:font-bold">
            Welcome Back!
          </h1>
          <p className="mb:text-[20px] text-[14px] text-[#373636] md:text-xl">
            Log in with your email and password
          </p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="mb:text-[14px] text-[16px] text-[#373636]"
              >
                Email Address
              </label>
              <Input
                type="email"
                required={true}
                placeholder="Enter your email address"
                className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-red-500 focus:border focus:border-gray-500 focus:bg-white focus:outline-none md:text-base"
                {...register("email")}
              />
              {errors.email && (
                <p className="w-full text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb:text-[14px] text-[16px] text-[#373636]"
              >
                Password
              </label>
              <Input
                type="password"
                required={true}
                placeholder="Enter a valid password"
                className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-red-500 focus:border focus:border-gray-500 focus:bg-white focus:outline-none md:text-base"
                {...register("password")}
              />
              {errors.password && (
                <p className="mb-4 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label
              htmlFor="checkbox"
              className="ml-1 text-[12px] md:text-[16px]"
            >
              Remember me
            </label>
            <span className="ml-10 text-[12px] md:ml-45 md:text-[16px]">
              <Link to="/forgot-password">Forgot your password?</Link>
            </span>
            <Button
              type="submit"
              className={clsx(
                "mt-7 w-full transition-colors",
                "hover:bg-blue-700",
              )}
            >
              {isSubmitting ? "Submitting" : "Sign In"}
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
              onClick={() => console.log("Google login")}
              className="text-sm font-semibold text-blue-700"
            />
            <SocialAuthButton
              label="Continue with Apple"
              icon={AppleIcon}
              onClick={() => console.log("Apple login")}
              className="text-sm font-semibold text-blue-700"
            />
          </div>
          {/* bottom login link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            New to ReTaler? {""}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Signin;
