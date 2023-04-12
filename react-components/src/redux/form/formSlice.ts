import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonForm } from 'date/types_date';

interface PersonsFormState {
  persons: PersonForm[];
}

const initialState: PersonsFormState = {
  persons: [],
};

export const formSlice = createSlice({
  name: 'formCards',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<PersonForm>) => {
      state.persons.push(action.payload);
    },
  },
});

export const { addPerson } = formSlice.actions;

export default formSlice.reducer;
