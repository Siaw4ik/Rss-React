import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { CardDetails } from '../../components/CardDetails';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { server } from '../mocks/server';
import { rick_mortiApi } from '../../redux/services/rick_morti';
import { setId } from '../../redux/features/personsSlice';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(rick_mortiApi.util.resetApiState());
});

afterAll(() => server.close());

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

describe('Modal window CardDetails', () => {
  it('should be render on HomePage', async () => {
    store.dispatch(setId(197));

    const { findByTestId, getByText } = render(
      <Provider store={store}>
        <CardDetails onClose={() => {}} />
      </Provider>
    );

    expect(screen.getByTestId('container-cardDetails')).toBeInTheDocument();
    expect(screen.getByTestId('cardDetails-cross')).toBeInTheDocument();

    const cardDetailsName = await findByTestId('person-name');

    await waitFor(() => {
      expect(cardDetailsName).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText('Kyle')).toBeInTheDocument();
    });
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

  it('should draw error if response fail', async () => {
    store.dispatch(setId(1111));
    const { findByTestId } = render(
      <Provider store={store}>
        <CardDetails onClose={() => {}} />
      </Provider>
    );

    const errorMessage = await findByTestId('title-error');

    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
