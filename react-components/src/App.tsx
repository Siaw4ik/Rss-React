import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from 'pages/HomePage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';

import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
