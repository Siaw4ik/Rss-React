import React, { ChangeEvent, FormEventHandler } from 'react';
import glass from '../assets/search_glass.png';
import { SearchBarProps } from 'date/types_date';

export function SearchBar({ onHandleSearch, onHandleLocalStorage, inputValue }: SearchBarProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onHandleLocalStorage(value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onHandleLocalStorage(inputValue);
    onHandleSearch();
  };

  return (
    <form className="searchBar" onSubmit={handleSubmit}>
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
