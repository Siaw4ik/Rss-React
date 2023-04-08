import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from '../App';

describe('App', () => {
  test('renders home page', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
    });
    expect(screen.getByText('Library Rick and Morty')).toBeInTheDocument();
  });

  test('renders about page', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('This is the ABOUT page')).toBeInTheDocument();
  });

  test('renders not found page', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('This is the 404 page')).toBeInTheDocument();
  });
});
