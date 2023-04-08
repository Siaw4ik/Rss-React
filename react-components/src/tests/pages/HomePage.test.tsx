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

let container: HTMLDivElement | null = null;

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

describe('Home Page', () => {
  it('renders home page', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      );
    });
    const homeTitle = screen.getByTestId('homepage-h1');
    expect(homeTitle).toBeInTheDocument();
  });

  it('renders on homepage loader', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
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
