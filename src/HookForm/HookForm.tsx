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
import { toBase64 } from '../utils/toBase64';
import { COUNTRIES } from '../constants/countries';
YupPassword(yup);

function HookForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
    const res = (await toBase64(data.image[0])) as string;
    const storeData = { ...data, image: res };
    dispatch(addFormData(storeData));
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
      <div className="control-block">
        <div className="gender-select">
          <select {...register('gender')}>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className="ts-checkbox">
          <div className="ts-block">
            <label htmlFor="termsOfService">
              Agree to Terms and Conditions
            </label>

            <input type="checkbox" {...register('termsOfService')} />
          </div>
          <p>{errors.termsOfService?.message}</p>
        </div>
      </div>
      <label>Choose a profile picture:</label>

      <input {...register('image')} type="file" />
      <p>{errors.image?.message}</p>

      <label htmlFor="country-choice">Choose a country:</label>
      <input {...register('country')} type="text" list="countries" id='country-choice' />
      <p>{errors.country?.message}</p>

<datalist id="countries">
  {COUNTRIES.map(el => (<option key={el} value={el}></option>))}
</datalist>

      <input disabled={!!Object.keys(errors).length} type="submit" />

    </form>
  );
}

export default HookForm;
