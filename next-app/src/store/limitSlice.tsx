import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: number = 20;

const limitSlice = createSlice({
  name: 'limit',
  initialState: {
    limit: initialState,
  },
  reducers: {
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export default limitSlice.reducer;
export const { setLimit } = limitSlice.actions;
