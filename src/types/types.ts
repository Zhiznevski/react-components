export type FormInputs = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsOfService: NonNullable<boolean | undefined>;
  image: FileList;
};
