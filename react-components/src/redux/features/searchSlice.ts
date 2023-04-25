import * as toolkitRaw from '@reduxjs/toolkit';
export type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;

export interface SearchState {
  inputValue: string;
}

const initialState: SearchState = {
  inputValue: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setInputValue: (state, action: toolkitRaw.PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  },
});

export const { setInputValue } = searchSlice.actions;

export default searchSlice.reducer;
