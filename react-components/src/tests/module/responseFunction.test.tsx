import { unmountComponentAtNode } from 'react-dom';
import { server } from '../mocks/server';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { getDataFromServerSearch, getDataFromServerPerson } from '../../module/responseFunction';
import 'whatwg-fetch';

let container: HTMLDivElement | null = null;
// beforeAll(() => server.listen());

beforeEach(() => {
  container = document.createElement('div') as HTMLDivElement;
  document.body.appendChild(container);
  server.listen();
});

afterEach(() => {
  unmountComponentAtNode(container as Element);
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
  server.resetHandlers();
  server.close();
});

// afterAll(() => server.close());

const mockPerson = [
  {
    id: 197,
    name: 'Kyle',
    status: 'Dead',
    species: 'Humanoid',
    type: 'Miniverse inhabitant',
    gender: 'Male',
    origin: {
      name: "Zeep Xanflorp's Miniverse",
      url: 'https://rickandmortyapi.com/api/location/49',
    },
    location: {
      name: "Kyle's Teenyverse",
      url: 'https://rickandmortyapi.com/api/location/50',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/197.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/17'],
    url: 'https://rickandmortyapi.com/api/character/197',
    created: '2017-12-30T12:39:09.025Z',
  },
];

describe('response function', () => {
  it('getDataFromServerSearch should return object', async () => {
    const persons = await getDataFromServerSearch('kyle');
    expect(persons).toStrictEqual(mockPerson);
  });
  it('getDataFromServerSearch should return error', async () => {
    try {
      await getDataFromServerSearch('qwert');
    } catch {
      await expect(getDataFromServerSearch('qwert')).rejects.toThrow('errors');
    }
  });

  it('getDataFromServerPerson should return object', async () => {
    const persons = await getDataFromServerPerson(197);
    expect(persons).toStrictEqual(mockPerson[0]);
  });
  it('getDataFromServerPerson should return error', async () => {
    try {
      await getDataFromServerPerson(1000);
    } catch {
      await expect(getDataFromServerPerson(1000)).rejects.toThrow('errors');
    }
  });
});
