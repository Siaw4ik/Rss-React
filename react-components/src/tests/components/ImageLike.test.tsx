import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { ImageLike } from '../../components/ImageLike';

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

const mockId = 2;

describe('test like image', () => {
  it('renders like image', () => {
    render(<ImageLike id={mockId} />);

    const likeImage = screen.getByTestId('like-image');

    fireEvent.click(likeImage);

    expect(likeImage).toHaveClass('active');

  });
});