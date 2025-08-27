import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import { BASE_URL } from "@/constants/api";
import { TOKEN_IDENTIFIER, USER_INFO_KEY, REFRESH_TOKEN_IDENTIFIER } from "@/constants";
import { toast } from "sonner";

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");

      if (code) {
        try {
          const rsp = await axiosInstance.post(
            `${BASE_URL}/v1/users/google-auth/callback`,
            { code },
          );

          const {
            token: { access_token, refresh_token },
            user,
          } = rsp.data;

          sessionStorage.setItem(TOKEN_IDENTIFIER, access_token);
          sessionStorage.setItem(REFRESH_TOKEN_IDENTIFIER, refresh_token);
          sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(user));

          navigate("/dashboard");
        } catch (error) {
          console.log({ error });
          const message =
            error?.response?.data?.detail ?? "Something went wrong...";
          toast.error(message);
          navigate("/sign-in");
        }
      }
    };

    handleGoogleCallback();
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
