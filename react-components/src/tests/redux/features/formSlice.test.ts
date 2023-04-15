import reducer, { addPerson, PersonsFormState } from '../../../redux/features/formSlice';
import { PersonForm } from '../../../date/types_date';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({ personsForm: [] });
});

const mockPerson: PersonForm = {
  name: 'Morty',
  date: '2023-04-15',
  gender: 'Male',
  species: 'Human',
  status: 'Alive',
  consent: 'true',
  location: 'Planet Unknown',
  imageUrl: 'blob:http://localhost:3000/06a2a866-79d7-4aa4-9fef-a5947913fe82',
};

test('should adding a person being added to an empty array', () => {
  const previousState: PersonsFormState = {
    personsForm: [],
  };

  expect(reducer(previousState, addPerson(mockPerson))).toEqual({ personsForm: [mockPerson] });
});
