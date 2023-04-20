import * as toolkitRaw from '@reduxjs/toolkit';
export type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;
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
    addPerson: (state, action: toolkitRaw.PayloadAction<PersonForm>) => {
      state.personsForm.push(action.payload);
    },
  },
});

export const { addPerson } = formSlice.actions;

export default formSlice.reducer;
