import React from 'react';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { Header } from '../../components/Header';

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

describe('About Page', () => {
  it('renders about page', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const aboutTitle = screen.getByTestId('header');
    expect(aboutTitle).toBeInTheDocument();
  });

  it('should highlight active link in navigation', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const addProductLink = screen.getByText('Form');

    expect(homeLink).toHaveStyle('color: gold');
    expect(aboutLink).not.toHaveStyle('color: gold');
    expect(addProductLink).not.toHaveStyle('color: gold');

    act(() => {
      userEvent.click(aboutLink);
    });

    expect(homeLink).not.toHaveStyle('color: gold');
    expect(aboutLink).toHaveStyle('color: gold');
    expect(addProductLink).not.toHaveStyle('color: gold');

    act(() => {
      userEvent.click(addProductLink);
    });

    expect(homeLink).not.toHaveStyle('color: gold');
    expect(aboutLink).not.toHaveStyle('color: gold');
    expect(addProductLink).toHaveStyle('color: gold');
  });
});
