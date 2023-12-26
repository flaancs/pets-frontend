import React, { createContext, useState, useEffect } from "react";
import axiosClient from "@/utils/axios.client";

type UserContextType = {
  user: string | null;
  setUser: (user: string | null) => void;
};

interface ContextProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<ContextProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosClient.get("/session");
        const { username } = response.data;
        setUser(username);
      } catch (error) {
        console.error("Error fetching user data", error);
        setUser(null);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export const useUser = (): UserContextType => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("UserContext is not available");
  }
  return context;
};
