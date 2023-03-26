import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
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

type Likes = { id: number; isLike: boolean }[];

describe('ImageLike component', () => {
  it('should toggle the like button when clicked', () => {
    const mockId = 2;
    localStorage.setItem('likes', '[]');
    const { getByTestId } = render(<ImageLike id={mockId} />);
    const likeButton = getByTestId('like-image');

    expect(likeButton).not.toHaveClass('active');
    fireEvent.click(likeButton);
    expect(likeButton).toHaveClass('active');
  });

  it('should toggle like state when clicking on the heart icon', () => {
    const { getByTestId } = render(<ImageLike id={1} />);
    const likeImage = getByTestId('like-image');
    fireEvent.click(likeImage);
    expect(likeImage.classList.contains('active')).toBe(true);
    fireEvent.click(likeImage);
    expect(likeImage.classList.contains('active')).toBe(false);
  });

  it('should update local storage when toggling like state', () => {
    localStorage.clear();
    const { getByTestId } = render(<ImageLike id={1} />);
    const likeImage = getByTestId('like-image');
    fireEvent.click(likeImage);
    const likes: Likes = JSON.parse(localStorage.getItem('likes') || '[]');
    expect(likes).toEqual([{ id: 1, isLike: true }]);
    fireEvent.click(likeImage);
    const updatedLikes: Likes = JSON.parse(localStorage.getItem('likes') || '[]');
    expect(updatedLikes).toEqual([{ id: 1, isLike: false }]);
  });
});
