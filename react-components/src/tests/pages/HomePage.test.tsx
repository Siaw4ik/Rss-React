import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { HomePage } from '../../pages/HomePage';
import { server } from '../mocks/server';
import 'whatwg-fetch';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { rick_mortiApi } from '../../redux/services/rick_morti';

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

describe('Home Page', () => {
  it('renders home page and close cardDetails click shodow', async () => {
    const { findByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    const homeTitle = screen.getByTestId('homepage-h1');
    expect(homeTitle).toBeInTheDocument();

    const card = await findByTestId('card');

    await waitFor(() => {
      expect(card).toBeInTheDocument();
    });

    const cardclick = await findByTestId('card-description');

    fireEvent.click(cardclick);

    const cardDetails = await findByTestId('container-cardDetails');
    const cardDetailsShadow = await findByTestId('cardDetails-shadow');

    await waitFor(() => {
      expect(cardDetails).toBeInTheDocument();
      expect(cardDetailsShadow).toBeInTheDocument();
    });

    fireEvent.click(cardDetailsShadow);

    await waitFor(() => {
      expect(cardDetails).not.toBeInTheDocument();
      expect(cardDetailsShadow).not.toBeInTheDocument();
    });
  });

  it('renders home page and close cardDetails click shodow', async () => {
    const { findByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    const homeTitle = screen.getByTestId('homepage-h1');
    expect(homeTitle).toBeInTheDocument();

    const card = await findByTestId('card');

    await waitFor(() => {
      expect(card).toBeInTheDocument();
    });

    const cardclick = await findByTestId('card-description');

    fireEvent.click(cardclick);

    const cardDetails = await findByTestId('container-cardDetails');
    const cardDetailsShadow = await findByTestId('cardDetails-shadow');
    const cardDetailsCross = await findByTestId('cardDetails-cross');

    await waitFor(() => {
      expect(cardDetails).toBeInTheDocument();
      expect(cardDetailsShadow).toBeInTheDocument();
    });

    fireEvent.click(cardDetailsCross);

    await waitFor(() => {
      expect(cardDetails).not.toBeInTheDocument();
      expect(cardDetailsShadow).not.toBeInTheDocument();
    });
  });

  it('renders on homepage error', async () => {
    const { findByTestId, getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    const input = getByTestId('searchbar');
    const searchForm = getByTestId('searchbarForm') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'qwert' } });

    await waitFor(() => expect(input).toHaveValue('qwert'));

    fireEvent.submit(searchForm);

    const errorMessage = await findByTestId('title-error');

    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('renders on homepage loader', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </Provider>
      );
    });

    const input = screen.getByTestId('searchbar');
    const searchForm = screen.getByTestId('searchbarForm') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, { target: { value: 'kyle' } });
      waitFor(() => expect(input).toHaveValue('kyle'));

      fireEvent.submit(searchForm);
      waitFor(() => {
        expect(screen.getByText('Kyle')).toBeInTheDocument();
      });
    });
  });
});
