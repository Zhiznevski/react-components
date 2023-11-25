import { configureStore } from '@reduxjs/toolkit';
import { personApi } from '../services/persons';
import searchSlice from './searchSlice';
import cardsLoadingSlice from './cardsLoadingSlice';
import limitSlice from './limitSlice';
import detailsLoadingSlice from './DetailsLoadingSlice';
import { createWrapper } from 'next-redux-wrapper';

export const store = () =>
  configureStore({
    reducer: {
      [personApi.reducerPath]: personApi.reducer,
      // search: searchSlice,
      // limit: limitSlice,
      // cardsLoading: cardsLoadingSlice,
      // detailsLoading: detailsLoadingSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(personApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(store, { debug: true });
