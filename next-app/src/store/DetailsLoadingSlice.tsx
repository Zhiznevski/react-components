import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { personApi } from '../services/persons';

const initialState: boolean = false;

const detailsLoadingSlice = createSlice({
  name: 'detailsLoading',
  initialState: {
    isDetailsLoading: initialState,
  },
  reducers: {
    setIsDetailsLoading(state, action: PayloadAction<boolean>) {
      state.isDetailsLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(personApi.endpoints.getPerson.matchPending, (state) => {
      state.isDetailsLoading = true;
    });
    builder.addMatcher(
      personApi.endpoints.getPerson.matchFulfilled,
      (state) => {
        state.isDetailsLoading = false;
      }
    );
  },
});

export default detailsLoadingSlice.reducer;
export const { setIsDetailsLoading } = detailsLoadingSlice.actions;
