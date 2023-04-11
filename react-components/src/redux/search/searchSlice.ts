import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from './searchType';

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
