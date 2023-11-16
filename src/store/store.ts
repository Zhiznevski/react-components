import { configureStore } from '@reduxjs/toolkit';
import { personApi } from '../services/persons';

export const store = configureStore({
  reducer: {
    [personApi.reducerPath]: personApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(personApi.middleware),
});
