import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import glass from '../assets/search_glass.png';

function getInputValueFormLocalStorage() {
  const valueFromLocalStorage = localStorage.getItem('searchInput');
  if (valueFromLocalStorage) {
    return JSON.parse(valueFromLocalStorage);
  }
  return '';
}

export function SearchBar() {
  const [value, setValue] = useState(getInputValueFormLocalStorage);

  const valueRef = useRef(value);

  useEffect(() => {
    return () => {
      localStorage.setItem('searchInput', JSON.stringify(valueRef.current));
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    valueRef.current = value;
  };

  return (
    <form className="searchBar">
      <input
        data-testid="searchbar"
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={value}
      />
      <img data-testid="search-image" className="searchGlass" src={glass} alt="search image" />
    </form>
  );
}
