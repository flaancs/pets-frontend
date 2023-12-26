import { Dispatch, SetStateAction } from "react";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import {
  Modal,
  Label,
  TextInput,
  Button,
  NumberInput,
  Toggle,
} from "keep-react";
import { toast } from "react-toastify";
import { Form, Formik, FormikHelpers } from "formik";
import { createPetSchema } from "@/schemas/pet";
import { PET_BREEDS, PET_TYPES } from "@/utils/constants";

type CreateT = {
  name: string;
  type: string;
  breed: string;
  age: number;
  isSterilized: boolean;
};

export interface CreatePetModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onCreate: (data: CreateT) => Promise<void>;
}

export default function CreatePetModal({
  setShowModal,
  onCreate,
}: CreatePetModalProps) {
  const handleCreate = async (
    { name, type, breed, age, isSterilized }: CreateT,
    helpers: FormikHelpers<CreateT>
  ) => {
    await onCreate({ name, type, breed, age, isSterilized })
      .then(() => {
        toast.success("Pet created successfully");
        helpers.resetForm();
        setShowModal(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Error creating pet");
      });
  };

  return (
    <>
      <Modal.Header>Create pet</Modal.Header>
      <Modal.Body className="flex flex-col gap-6">
        <div className="space-y-6">
          <p className="text-body-4 leading-relaxed text-metal-500">
            Add a new pet to pets registry
          </p>
        </div>
        <Formik
          initialValues={{
            name: "",
            type: "dog",
            breed: "labrador_retriever",
            age: 1,
            isSterilized: true,
          }}
          onSubmit={handleCreate}
          validationSchema={createPetSchema}
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
                  placeholder="Enter pet name"
                />
                {errors.name && (
                  <p className="text-error-500 text-body-4">{errors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="type" value="Type" />
                <select
                  name="type"
                  id="type"
                  value={values.type}
                  onChange={(e) => setFieldValue("type", e.currentTarget.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-500"
                >
                  {PET_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="text-error-500 text-body-4">{errors.type}</p>
                )}
              </div>
              <div>
                <Label htmlFor="breed" value="Breed" />
                <select
                  name="breed"
                  id="breed"
                  value={values.breed}
                  onChange={(e) =>
                    setFieldValue("breed", e.currentTarget.value)
                  }
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-500"
                >
                  {PET_BREEDS.filter((b) => b.pet_type === values.type).map(
                    (breed) => (
                      <option key={breed.value} value={breed.value}>
                        {breed.label}
                      </option>
                    )
                  )}
                </select>
                {errors.breed && (
                  <p className="text-error-500 text-body-4">{errors.breed}</p>
                )}
              </div>
              <div className="flex gap-4">
                <div>
                  <Label htmlFor="age" value="Age" />
                  <NumberInput
                    sizing="md"
                    name="age"
                    value={values.age}
                    setValue={() => setFieldValue("age", values.age + 1)}
                  />
                  {errors.age && (
                    <p className="text-error-500 text-body-4">{errors.age}</p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="isSterilized" value="Sterilized" />
                  <select
                    name="isSterilized"
                    id="isSterilized"
                    value={values.isSterilized.toString()}
                    onChange={(e) => {
                      const value = e.currentTarget.value === "true";
                      setFieldValue("isSterilized", value);
                    }}
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-500"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  {errors.type && (
                    <p className="text-error-500 text-body-4">{errors.type}</p>
                  )}
                </div>
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
                  Create pet
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
}
