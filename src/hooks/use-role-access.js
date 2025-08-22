import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER_INFO_KEY } from "@/constants";

const useRoleAccess = (allowedRoles) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem(USER_INFO_KEY));

    if (!user || !allowedRoles.includes(user.role)) {
      navigate("/inventory");
    }
  }, [allowedRoles, navigate]);
};

export default useRoleAccess;
