import { RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store';
import { rick_mortiApi } from './redux/services/rick_morti';

const store = setupStore();

export async function render(url: string, opts: RenderToPipeableStreamOptions) {
  await store.dispatch(rick_mortiApi.endpoints.getPersonsByName.initiate(''));
  const preloadedState = store.getState();
  const injectPreload = () => {
    return `
    <script>
    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
  </script>
    `;
  };

  const stream = renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
    opts
  );

  return { stream, injectPreload };
}
