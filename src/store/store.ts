import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formSlice';
import countrySlice from './countrySlice';

export const store = configureStore({
  reducer: {
    formData: formSlice,
    countryData: countrySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
