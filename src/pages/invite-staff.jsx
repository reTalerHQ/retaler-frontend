import React from "react";
import useRoleAccess from "../hooks/use-role-access";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { BASE_URL } from "@/constants/api";
import { useUser } from "@/context/user-context";
import { useQuery } from "@tanstack/react-query";
import { TOKEN_IDENTIFIER, USER_INFO_KEY } from "@/constants";

// ✅ Yup validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().required("Role is required"),
  name: yup.string().required("Name is required"),
  phone_number: yup.string().required("Phone number is required"),
});

export const InviteStaff = () => {
  useRoleAccess(["Manager", "Admin"]);
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
      name: "",
      phone_number: "",
    },
  });
  const { setStoreInfo } = useUser();

  const { isLoading } = useQuery({
    queryKey: ["FETCH_USER_STORE"],
    queryFn: async () => {
      const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
      const userInfo = JSON.parse(sessionStorage.getItem(USER_INFO_KEY));
      console.log(userInfo);

      const response = await axiosInstance.get(`${BASE_URL}/v1/store/`, {
        headers: {
          Authorization: `Bearer ${tokenFromStorage}`,
        },
      });
      const store = response?.data?.stores?.[0];
      setStoreInfo(store);
      return store;
    },
  });

  const { storeInfo } = useUser();
  console.log("storeInfo:", storeInfo);
  const onSubmit = async (data) => {
    try {
      const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
      const rsp = await axiosInstance.post(
        `${BASE_URL}/v1/store/${storeInfo.id}/staff`,
        {
          name: data.name,
          phone_number: data.phone_number,
          email: data.email,
          role: data.role,
        },

        {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
          },
        },
      );
      // console.log("storeInfo:", storeInfo);
      toast.success(rsp.data.detail);
      navigate("/watch-demo");
    } catch (error) {
      console.log({ error });
      console.log("Full error response:", error.response);
      let message;

      if (
        error.response &&
        Array.isArray(error.response.data?.detail) &&
        error.response.data.detail[0]?.msg
      ) {
        message = error.response.data.detail[0].msg;
      } else if (typeof error.response?.data?.detail === "string") {
        message = error.response.data.detail;
      } else if (error.message) {
        message = error.message;
      } else {
        message = "Something went wrong...";
      }

      toast.error(message);
    }
  };

  const handleSkip = () => {
    navigate("/watch-demo");
  };

  const roleOptions = JSON.parse(localStorage.getItem("roles")) || [];

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
          {/* <label className="mb-1 block text-sm">Name</label> */}
          <Input label="Name" type="text" {...register("name")} />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
          {/* <label className="mb-1 block text-sm">Phone Number</label> */}
          <Input
            label="Phone Number"
            type="number"
            {...register("phone_number")}
          />
          {errors.phone_number && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone_number.message}
            </p>
          )}
          <div>
            {/* <label className="mb-1 block text-sm">Email Address</label> */}
            <Input
              label="Email Address"
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
              {/* {roleOptions.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))} */}

              <option value="">Select Role</option>
              <option value="Manager">Manager</option>
              <option value="Sales Rep">Sales Rep</option>
              <option value="Admin">Admin</option>
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
