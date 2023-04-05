import { CardList } from '../components/CardList';
import React from 'react';
import { SearchBar } from '../components/SearchBar';

export function HomePage() {
  return (
    <div className="container_home">
      <h2 data-testid="homepage-h1">Store</h2>
      <SearchBar />
      <CardList />
    </div>
  );
}
