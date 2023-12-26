"use client";
import { Dispatch, SetStateAction } from "react";
import { CubeIcon } from "@heroicons/react/16/solid";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Badge, Button, Modal, SearchBar, Tabs } from "keep-react";
import { PET_TYPES } from "@/utils/constants";
import { useAccount } from "@/hooks/useAccount";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import CreatePetModal from "./CreatePetModal";

export interface PetTableHeaderProps {
  user: string | null;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  modalMode: "login" | "register" | "pet" | null;
  setModalMode: Dispatch<SetStateAction<"login" | "register" | "pet" | null>>;
  totalCount: number;
  type: string;
  handleDebounceSearch: (value: string) => void;
  handleChangeType: (value: number) => void;
  handleOpenLoginModal: () => void;
  handleOpenCreatePetModal: () => void;
  handleCreatePet: (data: {
    name: string;
    type: string;
    breed: string;
    age: number;
    isSterilized: boolean;
  }) => Promise<void>;
}

export default function PetsTableHeader({
  user,
  showModal,
  setShowModal,
  modalMode,
  setModalMode,
  totalCount,
  type,
  handleDebounceSearch,
  handleChangeType,
  handleOpenLoginModal,
  handleOpenCreatePetModal,
  handleCreatePet,
}: PetTableHeaderProps) {
  const { handleLogin, handleRegister, handleLogout } = useAccount({
    setShowModal,
  });

  return (
    <>
      <div className="flex justify-end items-center gap-6">
        {user && (
          <>
            <div className="flex gap-2">
              <UserCircleIcon width={24} />
              {user}
            </div>
            <Button color="error" type="linkPrimary" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </>
        )}
      </div>
      <Modal
        icon={<UserCircleIcon width={24} className="text-blue-600" />}
        size="lg"
        show={showModal}
        position="top-center"
      >
        {modalMode === "login" && (
          <LoginModal
            setShowModal={setShowModal}
            setModalMode={setModalMode}
            onLogin={handleLogin}
          />
        )}
        {modalMode === "register" && (
          <RegisterModal
            setShowModal={setShowModal}
            setModalMode={setModalMode}
            onRegister={handleRegister}
          />
        )}
        {modalMode === "pet" && (
          <CreatePetModal
            setShowModal={setShowModal}
            onCreate={handleCreatePet}
          />
        )}
      </Modal>
      <div className="w-full">
        <div className="my-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <p className="text-body-1 font-semibold text-metal-600">
              Pet Registry
            </p>
            <Badge size="xs" colorType="light" color="gray">
              {totalCount} pet{totalCount > 1 ? "s" : ""}
            </Badge>
          </div>
          <div className="flex items-center gap-5">
            <SearchBar
              placeholder="Search pet by name"
              size="md"
              addon={<MagnifyingGlassIcon width={20} color="#5E718D" />}
              addonPosition="left"
              icon={<ArrowRightIcon width={20} color="#5E718D" />}
              iconPosition="right"
              handleOnChange={(e) => handleDebounceSearch(e.target.value)}
            />
            {user ? (
              <Button
                type="outlineGray"
                size="sm"
                onClick={handleOpenCreatePetModal}
              >
                <span className="pr-2">
                  <CubeIcon width={24} />
                </span>
                New pet
              </Button>
            ) : (
              <Button
                type="outlineGray"
                size="sm"
                onClick={handleOpenLoginModal}
              >
                <span className="pr-2">
                  <CubeIcon width={24} />
                </span>
                Login to create pet
              </Button>
            )}
          </div>
        </div>
        <Tabs
          aria-label="Tabs"
          style="underline"
          borderPosition="bottom"
          iconPosition="left"
          onActiveTabChange={(val) => handleChangeType(val)}
        >
          <Tabs.Item
            title="All"
            icon={<CubeIcon width={18} />}
            active={type === "all"}
          />
          {PET_TYPES.map((pet_type) => (
            <Tabs.Item
              active={type === pet_type.value}
              key={pet_type.value}
              title={pet_type.label}
              icon={pet_type.icon}
            />
          ))}
        </Tabs>
      </div>
    </>
  );
}
