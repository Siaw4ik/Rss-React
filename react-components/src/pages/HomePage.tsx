import { CardList } from 'components/Card';
import React, { ChangeEvent, Component } from 'react';
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
  state = {
    inputValue: '',
  };

  componentDidMount() {
    const value = localStorage.getItem('searchInput');
    if (value && typeof value === 'string') {
      const parseValue = JSON.parse(value);
      this.setState({ inputValue: parseValue });
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    this.setState({ inputValue });
  };

  handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    localStorage.setItem('searchInput', JSON.stringify(inputValue));
  };

  render() {
    const inputValue = this.state.inputValue;
    return (
      <form className="searchBar">
        <input
          type="text"
          placeholder="Search..."
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          value={inputValue}
        />
        <img className="searchGlass" src={glass} alt="search image" />
      </form>
    );
  }
}
