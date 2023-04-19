import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

hydrateRoot(
  document.getElementById('root')!,
  <Provider store={store}>
    <App />
  </Provider>
);
