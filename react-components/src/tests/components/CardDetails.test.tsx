import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { CardDetails } from '../../components/CardDetails';
// import { Person } from '../../date/types_date';
import { Provider } from 'react-redux';
import { store } from '../../store';

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

/* const mockPerson: Person = {
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
}; */

describe('Modal window CardDetails', () => {
  it('should be render on HomePage', () => {
    render(
      <Provider store={store}>
        <CardDetails onClose={() => {}} />
      </Provider>
    );

    expect(screen.getByTestId('container-cardDetails')).toBeInTheDocument();
    expect(screen.getByTestId('cardDetails-cross')).toBeInTheDocument();
  });

  it('should be close', () => {
    const onCloseMock = jest.fn();
    render(
      <Provider store={store}>
        <CardDetails onClose={() => {}} />
      </Provider>
    );

    const imgCross = screen.getByTestId('cardDetails-cross');
    fireEvent.click(imgCross);

    waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('container-cardDetails')).not.toBeInTheDocument();
    });
  });

  /* it('should not be render on HomePage', () => {
    render(<CardDetails person={null} onClose={() => {}} onError={false} onLoading={false} />);

    expect(screen.queryByTestId('container-cardDetails')).toBeNull();
    expect(screen.queryByTestId('person-name')).toBeNull();
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
  }); */
});
