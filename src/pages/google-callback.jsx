import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/constants/api";
import {
  TOKEN_IDENTIFIER,
  USER_INFO_KEY,
  REFRESH_TOKEN_IDENTIFIER,
} from "@/constants";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { PagePreLoader } from "@/components/page-pre-loader";

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: handleGoogleResponse, isPending } = useMutation({
    mutationFn: async () => {
      const searchParams = new URLSearchParams(location.search);
      const accessToken = searchParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token");
      const authType = searchParams.get("type");

      if (!accessToken || !refreshToken) {
        toast.error("Google authenticatication failed");
        return;
      }

      try {
        sessionStorage.setItem(TOKEN_IDENTIFIER, accessToken);
        sessionStorage.setItem(REFRESH_TOKEN_IDENTIFIER, refreshToken);
        toast.success("Google authentication complete");
        const tokenInfo = jwtDecode(accessToken);

        const response = await axiosInstance.get(
          `${BASE_URL}/v1/users/${tokenInfo.id}`,
        );
        const user = response?.data?.user;

        if (!user) {
          toast.error("Google auth failed");
          return;
        }

        sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(user));

        if (authType && authType?.toUpperCase() === "SIGNUP") {
          navigate("/splash-dashboard");
          return;
        }

        navigate("/dashboard");
        return;
      } catch (error) {
        console.log({ error });
        const message = error.response.data.detail;
        toast.error(message ?? "Something went wrong...");
      }
    },
  });

  useEffect(() => {
    handleGoogleResponse();
  }, [handleGoogleResponse]);

  return <>{isPending && <PagePreLoader />}</>;
};

export default GoogleCallback;
