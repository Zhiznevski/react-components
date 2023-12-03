import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type StateInputs = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsOfService: NonNullable<boolean | undefined>;
  image: string;
  country: string;
};

const initialState: StateInputs[] = [];

const formSlice = createSlice({
  name: 'formData',
  initialState: {
    formData: initialState,
  },
  reducers: {
    addFormData(state, action: PayloadAction<StateInputs>) {
      state.formData.push(action.payload);
    },
  },
});

export default formSlice.reducer;
export const { addFormData } = formSlice.actions;
