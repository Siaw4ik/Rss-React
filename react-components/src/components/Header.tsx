import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo-store.png';

export function Header() {
  return (
    <header data-testid="header" className="header">
      <div>
        <NavLink to="/" className="logo">
          <img className="logo" src={logo} alt="" />
        </NavLink>
      </div>
      <div className="wrapper_navigation">
        <nav className="navigation">
          <ul>
            <li>
              <NavLink
                className="navigation_link"
                to="/"
                style={({ isActive }) =>
                  isActive
                    ? {
                        textDecoration: 'none',
                        color: 'gold',
                      }
                    : {}
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navigation_link"
                to="about"
                style={({ isActive }) =>
                  isActive
                    ? {
                        textDecoration: 'none',
                        color: 'gold',
                      }
                    : {}
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navigation_link"
                to="forms"
                style={({ isActive }) =>
                  isActive
                    ? {
                        textDecoration: 'none',
                        color: 'gold',
                      }
                    : {}
                }
              >
                Add Product
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
