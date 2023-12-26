import * as Yup from 'yup';

export const createPetSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),

  type: Yup.string()
    .required('Type is required'),

  breed: Yup.string()
    .required('Breed is required'),

  age: Yup.number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),

  isSterilized: Yup.boolean()
    .required('Sterilization status is required')
});
