import { Dispatch, SetStateAction } from "react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import { Form, Formik, FormikHelpers } from "formik";
import { Modal, Label, TextInput, Button } from "keep-react";
import { toast } from "react-toastify";
import { loginSchema } from "@/schemas/login";

type LoginT = {
  email: string;
  password: string;
};
export interface LoginModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setModalMode: Dispatch<SetStateAction<"login" | "register" | "pet" | null>>;
  onLogin: (data: LoginT) => Promise<void>;
}

export default function LoginModal({
  setShowModal,
  setModalMode,
  onLogin,
}: LoginModalProps) {
  const handleLogin = async (
    { email, password }: LoginT,
    helpers: FormikHelpers<LoginT>
  ) => {
    await onLogin({ email, password })
      .then(() => {
        toast.success("Login successfully");
        helpers.resetForm();
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
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ values, setFieldValue, errors, handleSubmit }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <Label htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  name="email"
                  value={values.email}
                  handleOnChange={(e) =>
                    setFieldValue("email", e.currentTarget.value)
                  }
                  placeholder="Enter your email"
                  type="email"
                  icon={<EnvelopeIcon width={20} />}
                  color="gray"
                />
                {errors.email && (
                  <p className="text-error-500 text-body-4">{errors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password" value="Password" />
                <TextInput
                  id="password"
                  name="password"
                  value={values.password}
                  handleOnChange={(e) =>
                    setFieldValue("password", e.currentTarget.value)
                  }
                  placeholder="Enter your password"
                  type="password"
                  icon={<LockClosedIcon width={20} />}
                  color="gray"
                />
                {errors.password && (
                  <p className="text-error-500 text-body-4">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="w-full flex justify-center">
                <Button
                  itemType="button"
                  type="linkPrimary"
                  onClick={() => setModalMode("register")}
                >
                  Don&apos;t have an account? Sign up
                </Button>
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  itemType="button"
                  type="outlineGray"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button itemType="submit" type="primary" onClick={handleSubmit}>
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
}
