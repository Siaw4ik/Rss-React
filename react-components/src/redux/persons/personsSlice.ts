import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from 'date/types_date';

interface PersonsState {
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
    changePersons: (state, action: PayloadAction<Person[]>) => {
      state.persons = action.payload;
    },
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const { changePersons, setId } = personsSlice.actions;

export default personsSlice.reducer;
