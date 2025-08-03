import React, { useState } from "react";
import { UserContext } from "./user-context";

export const UserProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(null);
  const [storeInfo, setStoreInfo] = useState(null);
  // You can add more user data here if needed
  return (
    <UserContext.Provider
      value={{ avatar, setAvatar, storeInfo, setStoreInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};
