import { Outlet } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export const Main = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
