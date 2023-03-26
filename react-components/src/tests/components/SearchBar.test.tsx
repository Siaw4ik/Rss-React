import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { SearchBar } from '../../components/SearchBar';

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

describe('Search Bar', () => {
  it('renders Search Bar', () => {
    render(<SearchBar />);
    const searchInput = screen.getByTestId('searchbar');
    const searchImage = screen.getByTestId('search-image');
    expect(searchInput).toBeInTheDocument();
    expect(searchImage).toBeInTheDocument();
  });

  it('change Search Bar input value', () => {
    render(<SearchBar />);
    const searchInput = screen.getByTestId('searchbar') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'slawa' } });
    expect(searchInput.value).toBe('slawa');
  });

  it('on blur change Search Bar input value', () => {
    render(<SearchBar />);
    const searchInput = screen.getByTestId('searchbar') as HTMLInputElement;
    fireEvent.blur(searchInput, { target: { value: 'slawa' } });
    expect(searchInput.value).toBe('slawa');
  });
});

describe('SearchBar', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should retrieve input value from local storage and set it to component state', () => {
    const storedValue = 'example input value';
    window.localStorage.setItem('searchInput', JSON.stringify(storedValue));

    const { getByTestId } = render(<SearchBar />);

    expect(getByTestId('searchbar')).toHaveValue(storedValue);
  });

  it('should not set inputValue in state if no value is stored in local storage', () => {
    const { getByTestId } = render(<SearchBar />);

    expect(getByTestId('searchbar')).toHaveValue('');
  });
});
