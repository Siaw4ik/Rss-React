import reducer, { changePersons, setId, PersonsState } from '../../../redux/features/personsSlice';
import { Person } from '../../../date/types_date';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    persons: [],
    id: 0,
  });
});

const mockPerson: Person[] = [
  {
    created: '2017-11-04T19:22:43.665Z',
    episode: [
      'https://rickandmortyapi.com/api/episode/6',
      'https://rickandmortyapi.com/api/episode/7',
    ],
    gender: 'Female',
    id: 4,
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    name: 'Beth Smith',
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    species: 'Human',
    status: 'Alive',
    type: '',
    url: 'https://rickandmortyapi.com/api/character/4',
  },
];

test('should adding a person being added to an empty array', () => {
  const previousState: PersonsState = {
    persons: [],
    id: 0,
  };

  expect(reducer(previousState, changePersons(mockPerson))).toEqual({
    persons: mockPerson,
    id: 0,
  });
});

test('should setting id', () => {
  const previousState: PersonsState = {
    persons: [],
    id: 0,
  };

  expect(reducer(previousState, setId(1))).toEqual({
    persons: [],
    id: 1,
  });
});
