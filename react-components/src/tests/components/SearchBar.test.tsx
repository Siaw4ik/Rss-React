import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
  beforeEach(() => {
    window.localStorage.clear();
  });

  const handleSearch = jest.fn();
  const handleLocalStorage = jest.fn();
  const mockInpunValue = 'slawa';

  it('renders Search Bar', () => {
    render(
      <SearchBar
        onHandleSearch={handleSearch}
        onHandleLocalStorage={handleLocalStorage}
        inputValue={mockInpunValue}
      />
    );
    const searchInput = screen.getByTestId('searchbar');
    const searchImage = screen.getByTestId('search-image');
    expect(searchInput).toBeInTheDocument();
    expect(searchImage).toBeInTheDocument();
  });

  it('change Search Bar input value', () => {
    render(
      <SearchBar
        onHandleSearch={handleSearch}
        onHandleLocalStorage={handleLocalStorage}
        inputValue={mockInpunValue}
      />
    );
    const searchInput = screen.getByTestId('searchbar') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'slawacool' } });
    waitFor(() => {
      expect(searchInput).toHaveValue('slawacool');
      expect(handleLocalStorage).toHaveBeenCalledWith('slawacool');
    });
  });

  it('submit Search Bar input value', () => {
    render(
      <SearchBar
        onHandleSearch={handleSearch}
        onHandleLocalStorage={handleLocalStorage}
        inputValue={mockInpunValue}
      />
    );
    const searchInput = screen.getByTestId('searchbar') as HTMLInputElement;
    const searchForm = screen.getByTestId('searchbarForm') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'slawacool' } });

    waitFor(() => {
      expect(searchInput).toHaveValue('slawacool');
      expect(handleLocalStorage).toHaveBeenCalledWith('slawacool');
    });

    fireEvent.submit(searchForm);

    waitFor(() => {
      expect(handleLocalStorage).toHaveBeenCalledWith('slawacool');
      expect(JSON.parse(window.localStorage.getItem('searchInput') as string)).toBe('slawacool');
      expect(handleSearch).toHaveBeenCalled();
    });
  });
});
