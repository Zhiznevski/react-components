import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formSlice';
import imageSlice from './imageSlice';

export const store = configureStore({
  reducer: {
    formData: formSlice,
    ImageData: imageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
