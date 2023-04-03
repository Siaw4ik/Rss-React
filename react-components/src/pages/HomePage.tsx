import { CardList } from '../components/CardList';
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SearchBar } from '../components/SearchBar';
import { Person } from 'date/types_date';
import { CardDetails } from '../components/CardDetails';

export function HomePage() {
  const [isShow, setIsShow] = useState(false);
  const [choosedCard, setChoosedCard] = useState<Person | null>(null);

  function handleClickCard(card: Person) {
    setIsShow(true);
    setChoosedCard(card);
  }

  return (
    <div className="container">
      <Header />
      <main className="main">
        <div className="container_home">
          <h2 data-testid="homepage-h1">Store</h2>
          <SearchBar />
          <CardList onCardClick={handleClickCard} />
          {isShow && <CardDetails person={choosedCard} onClose={() => setIsShow(false)} />}
          {isShow && <div className="cardDetails-shadow" onClick={() => setIsShow(false)}></div>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
