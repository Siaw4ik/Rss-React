import React, { FormEventHandler, useRef } from 'react';
import glass from '../assets/search_glass.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setInputValue } from '../redux/features/searchSlice';

export function SearchBar() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const inputValue = useSelector((state: RootState) => state.search.inputValue);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (searchRef.current) {
      dispatch(setInputValue(searchRef.current.value));
    }
  };

  return (
    <form data-testid="searchbarForm" className="searchBar" onSubmit={handleSubmit}>
      <input
        data-testid="searchbar"
        type="text"
        placeholder="Search..."
        defaultValue={inputValue || ''}
        ref={searchRef}
      />
      <img data-testid="search-image" className="searchGlass" src={glass} alt="search image" />
    </form>
  );
}
