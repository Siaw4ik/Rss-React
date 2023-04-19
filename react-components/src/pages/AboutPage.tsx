import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function AboutPage() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <h1 data-testid="aboutpage-h1">This is the ABOUT page</h1>
      </main>
      <Footer />
    </div>
  );
}
