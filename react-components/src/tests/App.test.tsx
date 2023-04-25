import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../redux/store';
import App from '../App';

const store = setupStore();

describe('App', () => {
  test('renders home page', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(screen.getByText('Library Rick and Morty')).toBeInTheDocument();
  });

  test('renders about page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('This is the ABOUT page')).toBeInTheDocument();
  });

  test('renders forms page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/forms']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Form for creating and adding a product')).toBeInTheDocument();
  });

  test('renders not found page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/non-existent-route']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('This is the 404 page')).toBeInTheDocument();
  });
});
