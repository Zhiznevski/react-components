import { configureStore } from '@reduxjs/toolkit';
import { personApi } from '../services/persons';
import searchSlice from './searchSlice';

export const store = configureStore({
  reducer: {
    [personApi.reducerPath]: personApi.reducer,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(personApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
