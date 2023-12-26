import { Dispatch, SetStateAction, useState } from "react";
import { UserCircleIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Modal, Label, TextInput, Button, Notification } from "keep-react";
import { useUser } from "@/context/user.context";
import { toast } from "react-toastify";

export interface RegisterModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setModalMode: Dispatch<SetStateAction<"login" | "register" | "pet" | null>>;
  onRegister: (data: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => Promise<void>;
}

export default function RegisterModal({
  setShowModal,
  setModalMode,
  onRegister,
}: RegisterModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+569");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await onRegister({ name, email, phoneNumber, password })
      .then(() => {
        toast.success("Account created successfully");
        setName("");
        setEmail("");
        setPhoneNumber("+569");
        setPassword("");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Error creating account");
      });
  };

  return (
    <>
      <Modal.Header>Sign up</Modal.Header>
      <Modal.Body className="flex flex-col gap-6">
        <div className="space-y-6">
          <p className="text-body-4 leading-relaxed text-metal-500">
            Create an account to create pets
          </p>
        </div>
        <div>
          <Label htmlFor="name" value="Name" />
          <TextInput
            id="name"
            value={name}
            handleOnChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter your name"
            icon={<UserCircleIcon width={20} />}
            color="gray"
          />
        </div>
        <div>
          <Label htmlFor="email" value="Email" />
          <TextInput
            id="email"
            value={email}
            handleOnChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Enter your email"
            type="email"
            icon={<EnvelopeIcon width={20} />}
            color="gray"
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber" value="Phone number" />
          <TextInput
            id="phoneNumber"
            value={phoneNumber}
            handleOnChange={(e) => setPhoneNumber(e.currentTarget.value)}
            placeholder="Enter your phone number"
            type="tel"
            icon={<PhoneIcon width={20} />}
            color="gray"
          />
        </div>
        <div>
          <Label htmlFor="password" value="Password" />
          <TextInput
            id="password"
            value={password}
            handleOnChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Enter your password"
            type="password"
            icon={<LockClosedIcon width={20} />}
            color="gray"
          />
        </div>
        <div className="w-full flex justify-center">
          <Button type="linkPrimary" onClick={() => setModalMode("login")}>
            Already have an account? Login
          </Button>
        </div>
        <div className="flex justify-end gap-4">
          <Button type="outlineGray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleRegister}>
            Create account
          </Button>
        </div>
      </Modal.Body>
    </>
  );
}
