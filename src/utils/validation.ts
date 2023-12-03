import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'Name must have first uppercased letter')
    .required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .password()
    //   .min(4
    //       , 'Password must have at least 4 characters"')
    .minNumbers(1, 'Password must have at least 1 digit')
    .minLowercase(1, 'Password must have at least 1 lowercase')
    .minUppercase(1, 'Password must have at least 1 uppercase')
    .required('Enter a password'),
  confirmPassword: yup
    .string()
    .required('Retype your password')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
});
