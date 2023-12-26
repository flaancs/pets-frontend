"use client";
import { UserProvider } from "@/context/user.context";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
      />
      <UserProvider>{children}</UserProvider>
    </>
  );
}
