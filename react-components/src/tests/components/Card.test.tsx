import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { Card } from '../../components/Card';
import { Person } from '../../date/types_date';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { setId } from '../../redux/features/personsSlice';

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

const mockPerson: Person = {
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
};

describe('test Card', () => {
  it('renders card', () => {
    const onShowDetails = jest.fn();
    const mockDispatch = jest.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <Card person={mockPerson} key={1} onShowDetails={onShowDetails} />
      </Provider>
    );
    const card = screen.getByTestId('card');
    const cardDescription = screen.getByTestId('card-description');

    expect(card).toBeInTheDocument();

    fireEvent.click(cardDescription);

    expect(onShowDetails).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(setId(mockPerson.id));
  });
});
