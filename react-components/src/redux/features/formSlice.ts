import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonForm } from '../../date/types_date';

export interface PersonsFormState {
  personsForm: PersonForm[];
}

const initialState: PersonsFormState = {
  personsForm: [],
};

export const formSlice = createSlice({
  name: 'formCards',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<PersonForm>) => {
      state.personsForm.push(action.payload);
    },
  },
});

export const { addPerson } = formSlice.actions;

export default formSlice.reducer;
