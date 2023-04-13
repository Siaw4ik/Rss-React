import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  inputValue: string;
}

const initialState: SearchState = {
  inputValue: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  },
});

export const { setInputValue } = searchSlice.actions;

export default searchSlice.reducer;
