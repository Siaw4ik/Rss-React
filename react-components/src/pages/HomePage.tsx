import { CardList } from '../components/CardList';
import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <div className="container_home">
          <h2 data-testid="homepage-h1">Store</h2>
          <SearchBar />
          <CardList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
