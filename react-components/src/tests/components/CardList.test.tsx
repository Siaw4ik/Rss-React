import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { CardList } from '../../components/CardList';
import { Person } from '../../date/types_date';
import { Provider } from 'react-redux';
import { setupStore } from '../../redux/store';

const store = setupStore();

let container: HTMLDivElement | null = null;
beforeEach(() => {
  container = document.createElement('div') as HTMLDivElement;
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container as Element);
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

const mockPersons: Person[] = [
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
    name: 'Slawa',
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    species: 'Human',
    status: 'Alive',
    type: '',
    url: 'https://rickandmortyapi.com/api/character/4',
  },
  {
    created: '2017-11-04T19:22:43.665Z',
    episode: [
      'https://rickandmortyapi.com/api/episode/6',
      'https://rickandmortyapi.com/api/episode/7',
    ],
    gender: 'Female',
    id: 5,
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

describe('test CardList', () => {
  it('renders card', () => {
    const onShowDetails = vi.fn();
    render(
      <Provider store={store}>
        <CardList onShowDetails={onShowDetails} persons={mockPersons} />
      </Provider>
    );
    const containerCards = screen.getByTestId('container_cards');

    expect(containerCards).toBeInTheDocument();
  });
});
