import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormInputs } from '../types/types';

const initialState: FormInputs[] = [];

const formSlice = createSlice({
  name: 'formData',
  initialState: {
    formData: initialState,
  },
  reducers: {
    addFormData(state, action: PayloadAction<FormInputs>) {
      // console.log(state)
      // console.log(action)
      state.formData.push(action.payload);
    },
  },
});

export default formSlice.reducer;
export const { addFormData } = formSlice.actions;