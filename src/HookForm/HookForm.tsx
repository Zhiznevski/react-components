import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../constants/constants';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { FormInputs } from '../types/types';
import { useAppDispatch } from '../hooks/hooks';
import { addFormData } from '../store/formSlice';
YupPassword(yup);

const schema = yup.object().shape({
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
});

function HookForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    dispatch(addFormData(data));
    navigate(HOME_ROUTE);
  };
  console.log('ошибочки', errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input {...register('name')} />
      <p>{errors.name?.message}</p>

      <label>Age</label>
      <input {...register('age')} />
      <p>{errors.age?.message}</p>

      <label>Email</label>
      <input {...register('email')} />
      <p>{errors.email?.message}</p>
      <label>Password</label>
      <input {...register('password')} />
      <p>{errors.password?.message}</p>
      <label> confirmPassword</label>
      <input {...register('confirmPassword')} />
      <p>{errors.confirmPassword?.message}</p>

      <input disabled={!!Object.keys(errors).length} type="submit" />
    </form>
  );
}

export default HookForm;
