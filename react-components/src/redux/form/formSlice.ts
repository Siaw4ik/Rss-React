import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});
