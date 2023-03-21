import { CardList } from '../components/CardList';
import React, { Component } from 'react';
import { SearchBar } from '../components/SearchBar';

export class HomePage extends Component {
  render() {
    return (
      <div className="container_home">
        <h2 data-testid="homepage-h1">Store</h2>
        <SearchBar />
        <CardList />
      </div>
    );
  }
}
