import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { ImageLike } from '../../components/ImageLike';
import { Provider } from 'react-redux';
import { setupStore } from '../../redux/store';

const store = setupStore();

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

// type Likes = { id: number; isLike: boolean }[];

describe('ImageLike component', () => {
  it('should toggle the like button when clicked', () => {
    const mockId = 2;
    const { getByTestId } = render(
      <Provider store={store}>
        <ImageLike id={mockId} />
      </Provider>
    );
    const likeButton = getByTestId('like-image');

    expect(likeButton).not.toHaveClass('active');
    fireEvent.click(likeButton);
    expect(likeButton).toHaveClass('active');
  });
});
