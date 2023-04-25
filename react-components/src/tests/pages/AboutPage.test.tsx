import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { AboutPage } from '../../pages/AboutPage';

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
        <AboutPage />
      </BrowserRouter>
    );
    const aboutTitle = screen.getByTestId('aboutpage-h1');
    expect(aboutTitle).toBeInTheDocument();
  });
});
