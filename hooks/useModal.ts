import { useState } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<
    "login" | "register" | "pet" | null
  >(null);

  const handleOpenLoginModal = () => {
    setModalMode("login");
    setShowModal(true);
  };

  return {
    showModal,
    setShowModal,
    modalMode,
    setModalMode,
    handleOpenLoginModal,
  };
};
