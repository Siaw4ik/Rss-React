import { CardList } from '../components/CardList';
import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SearchBar } from '../components/SearchBar';
import { Person } from 'date/types_date';
import { CardDetails } from '../components/CardDetails';
import { RickMortiResponse } from '../date/types_date';

export function HomePage() {
  const [isShow, setIsShow] = useState(false);
  const [choosedCard, setChoosedCard] = useState<Person | null>(null);
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    async function getAllPersons() {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data: RickMortiResponse = await response.json();
      setPersons(data.results);
    }
    getAllPersons();
  }, []);

  function handleClickCard(card: Person) {
    setIsShow(true);
    setChoosedCard(card);
    console.log(card);
  }

  return (
    <div className="container">
      <Header />
      {isShow && <div className="cardDetails-shadow" onClick={() => setIsShow(false)}></div>}
      {isShow && <CardDetails person={choosedCard} onClose={() => setIsShow(false)} />}
      <main className="main">
        <div className="container_home">
          <h2 data-testid="homepage-h1">Store</h2>
          <SearchBar />
          <CardList onCardClick={handleClickCard} persons={persons} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
