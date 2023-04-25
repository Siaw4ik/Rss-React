import * as toolkitRaw from '@reduxjs/toolkit';
export type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;
import { Person } from '../../date/types_date';

export interface PersonsState {
  persons: Person[];
  id: number;
}

const initialState: PersonsState = {
  persons: [],
  id: 0,
};

export const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    changePersons: (state, action: toolkitRaw.PayloadAction<Person[]>) => {
      state.persons = action.payload;
    },
    setId: (state, action: toolkitRaw.PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const { changePersons, setId } = personsSlice.actions;

export default personsSlice.reducer;
