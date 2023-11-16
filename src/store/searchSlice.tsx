import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: string =
  JSON.parse(localStorage.getItem('searchItem_key')!) || '';

const searchSlice = createSlice({
  name: 'searchValue',
  initialState: {
    searchValue: initialState,
  },
  reducers: {
    addSearchValue(state, action: PayloadAction<string>) {
      // console.log(state)
      // console.log(action)
      state.searchValue = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { addSearchValue } = searchSlice.actions;
