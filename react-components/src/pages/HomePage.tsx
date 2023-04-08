import { CardList } from '../components/CardList';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SearchBar } from '../components/SearchBar';
import { Person } from 'date/types_date';
import { CardDetails } from '../components/CardDetails';
import { Error } from '../components/Error';
import { Loader } from '../components/Loader';
import { getInputValueFormLocalStorage } from '../components/searchIdLocalStorage';
import { getDataFromServerSearch, getDataFromServerPerson } from '../module/responseFunction';

export function HomePage() {
  const [value, setValue] = useState(getInputValueFormLocalStorage);
  const [isShow, setIsShow] = useState(false);
  const [choosedCard, setChoosedCard] = useState<Person | null>(null);
  const [persons, setPersons] = useState<Person[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [showErrorsCard, setShowErrorsCard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCard, setIsLoadingCard] = useState(true);

  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const handleSearch = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: Person[] = await getDataFromServerSearch(valueRef.current);
      setShowErrors(false);
      setIsLoading(false);
      setPersons(data);
      console.log('search');
    } catch (error) {
      setIsLoading(false);
      setShowErrors(true);
    }
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  async function handleClickCard(id: number) {
    setIsShow(true);
    try {
      setIsLoadingCard(true);
      const card = await getDataFromServerPerson(id);
      setShowErrorsCard(false);
      setIsLoadingCard(false);
      console.log(card);
      setChoosedCard(card);
    } catch (error) {
      setIsLoadingCard(false);
      setShowErrorsCard(true);
    }
  }

  function handleLocalStorage(value: string) {
    setValue(value);
  }

  return (
    <div data-testid="container" className="container">
      <div className="container_header-main">
        <Header />
        {isShow && (
          <div
            className="cardDetails-shadow"
            onClick={() => {
              setIsShow(false);
              setShowErrorsCard(false);
            }}
          ></div>
        )}
        {isShow && (
          <CardDetails
            person={choosedCard}
            onClose={() => {
              setIsShow(false);
              setShowErrorsCard(false);
            }}
            onError={showErrorsCard}
            onLoading={isLoadingCard}
          />
        )}
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
                {showErrors && <Error onError={showErrorsCard} />}
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
