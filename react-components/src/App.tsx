import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FormsPage } from './pages/FormsPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import './App.css';
import '../src/css-componenets/header-footer.css';
import '../src/css-componenets/homepage.css';
import '../src/css-componenets/formspage.css';

function App() {
  return (
    <div className="container">
      <div>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
