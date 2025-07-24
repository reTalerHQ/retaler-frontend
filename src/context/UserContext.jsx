import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(null);
  // You can add more user data here if needed
  return (
    <UserContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
