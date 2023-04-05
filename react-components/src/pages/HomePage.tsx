import { CardList } from '../components/CardList';
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SearchBar } from '../components/SearchBar';
import { Person } from 'date/types_date';
import { CardDetails } from '../components/CardDetails';
import { Errors } from '../components/Error';
import { Loader } from '../components/Loader';
import { getInputValueFormLocalStorage } from '../components/searchIdLocalStorage';
import { getDataFromServerSearch, getDataFromServerStart } from '../module/responseFunction';

export function HomePage() {
  const [value, setValue] = useState(getInputValueFormLocalStorage);
  const [isShow, setIsShow] = useState(false);
  const [choosedCard, setChoosedCard] = useState<Person | null>(null);
  const [persons, setPersons] = useState<Person[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('searchInput', JSON.stringify(value));
    return () => {
      localStorage.setItem('searchInput', JSON.stringify(value));
    };
  }, [value]);

  const handleSearch = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: Person[] = await getDataFromServerSearch(value);
      setShowErrors(false);
      setIsLoading(false);
      setPersons(data);
    } catch (error) {
      setIsLoading(false);
      setShowErrors(true);
    }
  }, [value]);

  const getPersonsStart = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getDataFromServerStart();
      setShowErrors(false);
      setIsLoading(false);
      setPersons(data);
    } catch (error) {
      setIsLoading(false);
      setShowErrors(true);
    }
  }, []);

  useEffect(() => {
    if (!value) {
      getPersonsStart();
    } else if (value) {
      handleSearch();
    }
  }, []);

  function handleClickCard(card: Person) {
    setIsShow(true);
    setChoosedCard(card);
    console.log(card);
  }

  function handleLocalStorage(value: string) {
    setValue(value);
  }

  return (
    <div className="container">
      <div className="container_header-main">
        <Header />
        {isShow && <div className="cardDetails-shadow" onClick={() => setIsShow(false)}></div>}
        {isShow && <CardDetails person={choosedCard} onClose={() => setIsShow(false)} />}
        <main className="main">
          <div className="container_home">
            <h2 data-testid="homepage-h1">Library Rick and Morty</h2>
            <SearchBar
              onHandleSearch={handleSearch}
              onHandleLocalStorage={handleLocalStorage}
              inputValue={value}
            />
            {isLoading && <Loader />}
            {!isLoading && (
              <>
                {showErrors && <Errors />}
                {!showErrors && <CardList onCardClick={handleClickCard} persons={persons} />}
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
