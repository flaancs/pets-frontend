import * as Yup from 'yup';

export const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  phoneNumber: Yup.string()
    .matches(/^[+0-9]+$/, "Phone number must be numeric")
    .min(10, 'Phone number must be at least 10 digits long')
    .required('Phone number is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required')
});
