import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import { Modal, Label, TextInput, Button } from "keep-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

export interface LoginModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setModalMode: Dispatch<SetStateAction<"login" | "register" | "pet" | null>>;
  onLogin: (data: { email: string; password: string }) => Promise<void>;
}

export default function LoginModal({
  setShowModal,
  setModalMode,
  onLogin,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await onLogin({ email, password })
      .then(() => {
        toast.success("Login successfully");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Error logging in");
      });
  };

  return (
    <>
      <Modal.Header>Login</Modal.Header>
      <Modal.Body className="flex flex-col gap-6">
        <div className="space-y-6">
          <p className="text-body-4 leading-relaxed text-metal-500">
            Login into your account to create pets
          </p>
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
          <Button type="linkPrimary" onClick={() => setModalMode("register")}>
            Don&apos;t have an account? Sign up
          </Button>
        </div>
        <div className="flex justify-end gap-4">
          <Button type="outlineGray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Modal.Body>
    </>
  );
}
