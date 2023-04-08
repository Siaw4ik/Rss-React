import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { CardDetails } from '../../components/CardDetails';
import { Person } from '../../date/types_date';

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

describe('Modal window CardDetails', () => {
  it('should be render on HomePage', () => {
    render(
      <CardDetails person={mockPerson} onClose={() => {}} onError={false} onLoading={false} />
    );

    expect(screen.getByTestId('container-cardDetails')).toBeInTheDocument();
    expect(screen.getByTestId('person-name')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).toBeNull();
  });

  it('should not be render on HomePage', () => {
    render(<CardDetails person={null} onClose={() => {}} onError={false} onLoading={false} />);

    expect(screen.queryByTestId('container-cardDetails')).toBeNull();
    expect(screen.queryByTestId('person-name')).toBeNull();
  });

  it('should be close', () => {
    const onCloseMock = jest.fn();
    render(
      <CardDetails person={mockPerson} onClose={onCloseMock} onError={false} onLoading={false} />
    );

    const imgCross = screen.getByTestId('cardDetails-cross');
    fireEvent.click(imgCross);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('renders the Loader component when onLoading is true', () => {
    const { getByTestId } = render(
      <CardDetails person={mockPerson} onClose={() => {}} onError={false} onLoading={true} />
    );

    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('should draw error if response fail', () => {
    const { getByTestId } = render(
      <CardDetails person={mockPerson} onClose={() => {}} onError={true} onLoading={false} />
    );

    expect(getByTestId('title-error')).toBeInTheDocument();
  });
});
