import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { personApi } from '../services/persons';

const initialState: boolean = false;

const cardsLoadingSlice = createSlice({
  name: 'cardsLoading',
  initialState: {
    isCardsLoading: initialState,
  },
  reducers: {
    setIsCardsLoading(state, action: PayloadAction<boolean>) {
      state.isCardsLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(personApi.endpoints.getPersons.matchPending, (state) => {
      state.isCardsLoading = true;
    });
    builder.addMatcher(
      personApi.endpoints.getPersons.matchFulfilled,
      (state) => {
        state.isCardsLoading = false;
      }
    );
  },
});

export default cardsLoadingSlice.reducer;
export const { setIsCardsLoading } = cardsLoadingSlice.actions;
