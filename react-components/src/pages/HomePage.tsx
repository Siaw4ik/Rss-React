import { CardList } from 'components/Card';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import glass from '../assets/search_glass.png';

export class HomePage extends Component {
  render() {
    return (
      <div className="container_home">
        <h2>Store</h2>
        <SearchBar />
        <CardList />
      </div>
    );
  }
}

class SearchBar extends Component {
  render() {
    return (
      <form className="searchBar">
        <input type="text" placeholder="Search..." />
        <img className="searchGlass" src={glass} alt="search image" />
      </form>
    );
  }
}
