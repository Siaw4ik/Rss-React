import React, { ChangeEvent, FormEventHandler } from 'react';
import glass from '../assets/search_glass.png';
import { SearchBarProps } from 'date/types_date';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setInputValue } from '../redux/search/searchSlice';

export function SearchBar({ onHandleSearch, onHandleLocalStorage }: SearchBarProps) {
  const dispatch = useDispatch();
  const inputValue = useSelector((state: RootState) => state.search.inputValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onHandleLocalStorage(value);
    dispatch(setInputValue(value));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onHandleLocalStorage(inputValue);
    onHandleSearch();
    /* if (inputValue !== '') {
      onHandleSearch();
    } */
  };

  return (
    <form data-testid="searchbarForm" className="searchBar" onSubmit={handleSubmit}>
      <input
        data-testid="searchbar"
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
      />
      <img data-testid="search-image" className="searchGlass" src={glass} alt="search image" />
    </form>
  );
}
