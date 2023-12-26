import { Dispatch, SetStateAction } from "react";
import { UserCircleIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Modal, Label, TextInput, Button } from "keep-react";
import { toast } from "react-toastify";
import { Form, Formik, FormikHelpers } from "formik";
import { registrationSchema } from "@/schemas/register";

type RegisterT = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export interface RegisterModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setModalMode: Dispatch<SetStateAction<"login" | "register" | "pet" | null>>;
  onRegister: (data: RegisterT) => Promise<void>;
}

export default function RegisterModal({
  setShowModal,
  setModalMode,
  onRegister,
}: RegisterModalProps) {
  const handleRegister = async (
    { name, email, phoneNumber, password }: RegisterT,
    helpers: FormikHelpers<RegisterT>
  ) => {
    await onRegister({ name, email, phoneNumber, password })
      .then(() => {
        toast.success("Account created successfully");
        helpers.resetForm();
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
        <Formik
          initialValues={{
            name: "",
            email: "",
            phoneNumber: "+569",
            password: "",
          }}
          onSubmit={handleRegister}
          validationSchema={registrationSchema}
        >
          {({ setFieldValue, values, errors, handleSubmit }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <Label htmlFor="name" value="Name" />
                <TextInput
                  id="name"
                  name="name"
                  value={values.name}
                  handleOnChange={(e) =>
                    setFieldValue("name", e.currentTarget.value)
                  }
                  placeholder="Enter your name"
                  icon={<UserCircleIcon width={20} />}
                  color="gray"
                />
                {errors.name && (
                  <p className="text-error-500 text-body-4">{errors.name}</p>
                )}
              </div>
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
                <Label htmlFor="phoneNumber" value="Phone number" />
                <TextInput
                  id="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  handleOnChange={(e) =>
                    setFieldValue("phoneNumber", e.currentTarget.value)
                  }
                  placeholder="Enter your phone number"
                  type="tel"
                  icon={<PhoneIcon width={20} />}
                  color="gray"
                />
                {errors.phoneNumber && (
                  <p className="text-error-500 text-body-4">
                    {errors.phoneNumber}
                  </p>
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
                  onClick={() => setModalMode("login")}
                >
                  Already have an account? Login
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
                  Create account
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
}
