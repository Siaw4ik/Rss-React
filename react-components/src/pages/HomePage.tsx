import React, { Component } from 'react';
/* import { Link } from 'react-router-dom';
import logo from '../assets/logo-store.png'; */

export class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>homepage</h1>
        <SearchBar />
      </div>
    );
  }
}

class SearchBar extends Component {
  render() {
    return (
      <div>
        <form>
          <p></p>
          <input type="text" placeholder="Search..." />
        </form>
      </div>
    );
  }
}
