import { CardList } from '../components/CardList';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SearchBar } from '../components/SearchBar';

export function HomePage() {
  return (
    <div data-testid="container" className="container">
      <div className="container_header-main">
        <Header />
        <main className="main">
          <div className="container_home">
            <h2 data-testid="homepage-h1">Library Rick and Morty</h2>
            <SearchBar />
            <CardList />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
