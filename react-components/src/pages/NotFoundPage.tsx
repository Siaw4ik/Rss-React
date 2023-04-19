import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function NotFoundPage() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <h1 data-testid="404page-h1">This is the 404 page</h1>
      </main>
      <Footer />
    </div>
  );
}
