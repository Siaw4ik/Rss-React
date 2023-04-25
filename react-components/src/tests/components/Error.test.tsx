import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { Error } from '../../components/Error';

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

describe('Error', () => {
  it('should be render on HomePage', () => {
    render(<Error onMini={false} />);

    expect(screen.getByTestId('title-error')).toBeInTheDocument();
    expect(screen.getByTestId('img-error')).toHaveClass('imageError');
  });

  it('renders about page', () => {
    render(<Error onMini={true} />);

    expect(screen.getByTestId('img-error')).toHaveClass('imageError');
  });
});
