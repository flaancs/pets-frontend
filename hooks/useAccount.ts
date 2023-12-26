import { useUser } from "@/context/user.context";
import axiosClient from "@/utils/axios.client";

export interface useAccountProps {
  setShowModal: (value: boolean) => void;
}

export const useAccount = ({ setShowModal }: useAccountProps) => {
  const { setUser } = useUser();

  const handleLogin = async (data: { email: string; password: string }) => {
    return axiosClient.post("/login", data).then((response) => {
      const { username } = response.data;
      setUser(username);
      setShowModal(false);
    });
  };

  const handleRegister = async (data: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => {
    return axiosClient.post("/register", data).then(() => {
      setShowModal(false);
    });
  };

  const handleLogout = async () => {
    return axiosClient.post("/logout").then(() => {
      setUser(null);
    });
  };

  return {
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
