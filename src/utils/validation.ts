import * as yup from 'yup';
import YupPassword from 'yup-password';
import { COUNTRIES } from '../constants/countries';
YupPassword(yup);

const MAX_IMAGE_SIZE = 3145728;

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
    .minNumbers(1, 'Password must have at least 1 digit')
    .minLowercase(1, 'Password must have at least 1 lowercase')
    .minUppercase(1, 'Password must have at least 1 uppercase')
    .required('Enter a password'),
  confirmPassword: yup
    .string()
    .required('Retype your password')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
  gender: yup
    .string()
    .matches(/["male"]/)
    .required(),
  termsOfService: yup.boolean().oneOf([true], 'must be accept').required(),
  image: yup
    .mixed<FileList>()
    .required('upload image')
    .transform((value) => (value[0] ? value : undefined))
    .test(
      'fileSize',
      'File Size is too large',
      (value) => value && value[0]?.size <= MAX_IMAGE_SIZE
    )
    .test('fileType', 'Unsupported File Format', (value) =>
      ['image/png', 'image/jpeg'].includes(value[0]?.type)
    ),
  country: yup
    .string()
    .required('Enter your country')
    .oneOf(COUNTRIES, 'Must be valid country'),
});
