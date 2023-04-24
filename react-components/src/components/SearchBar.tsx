import React, { useRef, useCallback } from 'react';
import glass from '../assets/search_glass.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setInputValue } from '../redux/features/searchSlice';

export function SearchBar() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const inputValue = useSelector((state: RootState) => state.search.inputValue);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (searchRef.current) {
        dispatch(setInputValue(searchRef.current.value));
      }
    },
    [dispatch]
  );

  return (
    <form data-testid="searchbarForm" className="searchBar" onSubmit={handleSubmit}>
      <input data-testid="searchbar" type="text" defaultValue={inputValue || ''} ref={searchRef} />
      <img data-testid="search-image" className="searchGlass" src={glass} alt="search image" />
    </form>
  );
}
