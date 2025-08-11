// import { createContext, useContext } from "react";

// export const UserContext = createContext();
// export const useUser = () => useContext(UserContext);
import { createContext, useContext, useState } from "react";

// Create context
const UserContext = createContext();

// Create a provider (this has no JSX — it's fine in .js file)
const UserProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(null);
  const [storeInfo, setStoreInfo] = useState(null);

  const value = {
    avatar,
    setAvatar,
    storeInfo,
    setStoreInfo,
  };

  return UserContext.Provider.call(null, { value, children });
};

// Hook for accessing user context
const useUser = () => useContext(UserContext);

export { UserContext, UserProvider, useUser };
