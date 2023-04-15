import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest';
import { SearchBar } from '../../components/SearchBar';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { setInputValue } from '../../redux/features/searchSlice';

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
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchInput = screen.getByTestId('searchbar');
    const searchImage = screen.getByTestId('search-image');
    expect(searchInput).toBeInTheDocument();
    expect(searchImage).toBeInTheDocument();
  });

  it('change Search Bar input value', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchInput = screen.getByTestId('searchbar') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'slawacool' } });
    waitFor(() => {
      expect(searchInput).toHaveValue('slawacool');
    });
  });

  it('submit Search Bar input value', () => {
    const mockDispatch = jest.spyOn(store, 'dispatch');
    const mockValue = 'slawa';
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchInput = screen.getByTestId('searchbar') as HTMLInputElement;
    const searchForm = screen.getByTestId('searchbarForm') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: mockValue } });

    waitFor(() => {
      expect(searchInput).toHaveValue(mockValue);
    });

    fireEvent.submit(searchForm);

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(setInputValue(mockValue));
    });
  });
});
