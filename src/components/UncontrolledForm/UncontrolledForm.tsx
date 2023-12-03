import { useRef, useState } from 'react';
import { schema } from '../../utils/validation';
import { ValidationError } from 'yup';

type ErrorObject = Record<string, { message: string }>;

function UncontrolledForm() {
  const [errors, setErrors] = useState<ErrorObject>();

  console.log(errors);
  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      name: name.current?.value,
      age: age.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      confirmPassword: confirmPassword.current?.value,
    };

    try {
      await schema.validate(formData, { abortEarly: false });
      // navigate(HOME_ROUTE);
    } catch (err) {
      if (err instanceof ValidationError) {
        console.log('inner', err.inner);

        const errs: ErrorObject = {};
        err.inner.forEach((e) => {
          if (e.path) errs[e.path] = { message: e.message };
        });
        setErrors(errs);
      }
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <label>Name</label>
      <input ref={name} type="text"></input>
      <p>{errors?.name?.message}</p>

      <label>Age</label>
      <input ref={age} type="text" name="age"></input>
      <p>{errors?.age?.message}</p>

      <label>Email</label>
      <input type="text" ref={email} />
      <p>{errors?.email?.message}</p>
      <label>Password</label>
      <input type="text" ref={password} />
      <p>{errors?.password?.message}</p>
      <label> confirmPassword</label>
      <input type="text" ref={confirmPassword} />
      <p>{errors?.confirmPassword?.message}</p>

      <input type="submit" />
    </form>
  );
}

export default UncontrolledForm;
