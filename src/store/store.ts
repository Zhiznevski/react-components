import { configureStore } from '@reduxjs/toolkit';
import { personApi } from '../services/persons';
import searchSlice from './searchSlice';
import cardsLoadingSlice from './cardsLoadingSlice';
import limitSlice from './limitSlice';
import detailsLoadingSlice from './DetailsLoadingSlice';

export const store = configureStore({
  reducer: {
    [personApi.reducerPath]: personApi.reducer,
    search: searchSlice,
    limit: limitSlice,
    cardsLoading: cardsLoadingSlice,
    detailsLoading: detailsLoadingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(personApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
