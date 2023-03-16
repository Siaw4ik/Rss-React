import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-store.png';

export class Header extends Component {
  render() {
    return (
      <header data-testid="header" className="header">
        <div>
          <Link to="/" className="logo">
            <img className="logo" src={logo} alt="" />
          </Link>
        </div>
        <div className="wrapper_navigation">
          <nav className="navigation">
            <ul>
              <li>
                <Link className="navigation_link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="navigation_link" to="about">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
