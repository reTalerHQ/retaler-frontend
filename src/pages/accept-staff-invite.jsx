import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import axios from "axios";
import { BASE_URL } from "@/constants/api";
import { toast } from "sonner";
import { PagePreLoader } from "@/components/page-pre-loader";

// ✅ New validation schema
const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Minimum of 3 character"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum of 8 characters")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/[0-9]/, "At least one number")
    .matches(/[\W_]/, "At least one special character"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const AcceptStaffInvite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accessToken, setAccessToken] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const password = watch("password");
  const [criteria, setCriteria] = useState({
    minChar: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  // ✅ Extract accessToken from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setAccessToken(token);
    }
  }, [location.search]);

  // ✅ Track password criteria
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
      const payload = {
        password: data.password,
        username: data.username,
      };

      const rsp = await axios.post(
        `${BASE_URL}/v1/store/accept-invitation?token=${accessToken}`,
        payload,
      );
      toast.success(rsp.data.detail);
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.detail;
      toast.error(message ?? "Something went wrong...");
    }
  };

  // ✅ If no token found → show invalid link
  if (!accessToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 text-center shadow-md">
          <h1 className="text-2xl font-bold text-red-600">Invalid Link</h1>
          <p className="mt-2 text-gray-600">
            The invitation link is invalid or has expired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-blue-50">
        <div className="my-0 flex w-xl flex-col justify-center rounded-lg bg-white px-10 py-8 shadow-md md:my-1 md:max-w-xl">
          <h1 className="mb-2 text-lg font-semibold md:text-3xl">
            Accept Staff Invitation
          </h1>
          <p className="mb-2 text-sm text-gray-600 md:text-lg">
            Set your account password to continue
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
            noValidate
          >
            {/* Username */}
            <div>
              <Input
                label="Username"
                type="text"
                placeholder="Enter a valid Username"
                {...register("username")}
                className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-red-500 focus:border focus:border-gray-500 focus:bg-white focus:outline-none md:text-base"
                error={errors?.username?.message}
              />
            </div>
            {/* Password */}
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter a valid password"
                {...register("password")}
                className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-red-500 focus:border focus:border-gray-500 focus:bg-white focus:outline-none md:text-base"
                error={errors?.password?.message}
              />
            </div>

            {/* Confirm Password */}
            <div className="mt-4">
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your password"
                {...register("confirmPassword")}
                className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-red-500 focus:border focus:border-gray-500 focus:bg-white focus:outline-none md:text-base"
                error={errors?.confirmPassword?.message}
              />
            </div>

            {/* Password checklist */}
            {password && (
              <ul className="mt-2 mb-4 space-y-1 text-xs">
                <li
                  className={
                    criteria.minChar ? "text-green-600" : "text-red-500"
                  }
                >
                  {criteria.minChar ? "✅" : "❌"} Minimum of 8 characters
                </li>
                <li
                  className={criteria.upper ? "text-green-600" : "text-red-500"}
                >
                  {criteria.upper ? "✅" : "❌"} 1 Uppercase letter (A-Z)
                </li>
                <li
                  className={criteria.lower ? "text-green-600" : "text-red-500"}
                >
                  {criteria.lower ? "✅" : "❌"} 1 Lowercase letter (a-z)
                </li>
                <li
                  className={
                    criteria.number ? "text-green-600" : "text-red-500"
                  }
                >
                  {criteria.number ? "✅" : "❌"} 1 number (0-9)
                </li>
                <li
                  className={
                    criteria.special ? "text-green-600" : "text-red-500"
                  }
                >
                  {criteria.special ? "✅" : "❌"} 1 special character
                </li>
              </ul>
            )}

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={clsx(
                "w-full transition-colors",
                "disabled:bg-blue-700",
                isValid ? "bg-blue-600 hover:bg-blue-700" : "",
              )}
            >
              {isSubmitting ? "Submitting..." : "Continue"}
            </Button>
          </form>
        </div>
      </div>
      {isSubmitting && <PagePreLoader />}
    </>
  );
};

export default AcceptStaffInvite;
