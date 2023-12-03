import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: string[] = [];

const imageSlice = createSlice({
  name: 'imageData',
  initialState: {
    imageData: initialState,
  },
  reducers: {
    addImage(state, action: PayloadAction<string>) {
      state.imageData.push(action.payload);
    },
  },
});

export default imageSlice.reducer;
export const { addImage } = imageSlice.actions;
