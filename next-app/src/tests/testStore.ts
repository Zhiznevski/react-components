import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import { personApi } from '../services/persons';
import detailsLoadingSlice from '../store/DetailsLoadingSlice';
import cardsLoadingSlice from '../store/cardsLoadingSlice';
import limitSlice from '../store/limitSlice';
import searchSlice from '../store/searchSlice';

const rootReducer = combineReducers({
  [personApi.reducerPath]: personApi.reducer,
  search: searchSlice,
  limit: limitSlice,
  cardsLoading: cardsLoadingSlice,
  detailsLoading: detailsLoadingSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(personApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
