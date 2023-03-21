import React, { ChangeEvent, Component } from 'react';
import glass from '../assets/search_glass.png';

interface SearchBarProps {
  handleChange?: () => void;
}

interface SearchBarState {
  inputValue: string;
}

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    const value = localStorage.getItem('searchInput');
    this.state = {
      inputValue: value ? JSON.parse(value) : '',
    };
  }

  componentWillUnmount() {
    const { inputValue } = this.state;
    localStorage.setItem('searchInput', JSON.stringify(inputValue));
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
          data-testid="searchbar"
          type="text"
          placeholder="Search..."
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          value={inputValue}
        />
        <img data-testid="search-image" className="searchGlass" src={glass} alt="search image" />
      </form>
    );
  }
}
