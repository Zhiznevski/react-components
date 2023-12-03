import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../constants/constants';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { FormInputs } from '../types/types';
import { useAppDispatch } from '../hooks/hooks';
import { addFormData } from '../store/formSlice';
import { schema } from '../utils/validation';
YupPassword(yup);


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
      <div className='control-block'>
        <div className='gender-select'>
      <select {...register("gender")}>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
        </div>
        <div className='ts-checkbox'>
      <div className='ts-block'>
      <label htmlFor="termsOfService">Agree to Terms and Conditions</label>

      <input
            type='checkbox'
            {...register('termsOfService')}
          />
      </div>
           <p>{errors.termsOfService?.message}</p>

        </div>

      </div>
    

      <input disabled={!!Object.keys(errors).length} type="submit" />
    </form>
  );
}

export default HookForm;
