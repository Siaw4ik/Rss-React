import { createBrowserRouter } from 'react-router-dom';

import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { FormsPage } from './pages/FormsPage';
import { Main } from './pages/Main';

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/forms',
        element: <FormsPage />,
      },
      {
        path: '/*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
