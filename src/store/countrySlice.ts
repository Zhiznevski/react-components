import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../constants/countries';

const initialState = COUNTRIES;

const countrySlice = createSlice({
  name: 'countryData',
  initialState: {
    countryData: initialState,
  },
  reducers: {
    addCountry(state, action: PayloadAction<string>) {
      state.countryData.push(action.payload);
    },
  },
});

export default countrySlice.reducer;
export const { addCountry } = countrySlice.actions;
