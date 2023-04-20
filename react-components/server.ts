import { readFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

import { setupStore } from './src/redux/store';
import { RickMortiResponse } from './src/date/types_date';

const app = express();

const PORT = 8000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlIndex = resolve(__dirname, 'index.html');

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

app.use(vite.middlewares);

app.use('*', async (req, res, next) => {
  const url = req.originalUrl;

  try {
    const template = await readFile(htmlIndex, 'utf-8');

    const htmlData = await vite.transformIndexHtml(url, template);

    const [htmlStart, htmlEnd] = htmlData.split(`<!--ssr-outlet-->`);

    const { render } = await vite.ssrLoadModule('./src/entry-server.tsx');

    const responseCharacters = await fetch('https://rickandmortyapi.com/api/character/');
    const initialCharacters: RickMortiResponse = await responseCharacters.json();

    const store = setupStore({ persons: { persons: initialCharacters.results, id: 0 } });

    const preloadedState = store.getState();

    const inject = `
    <script>
      window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    `;

    const { pipe } = await render(url, {
      onShellReady() {
        res.write(htmlStart);
        pipe(res);
      },

      onAllReady() {
        const withPreload = htmlEnd.replace('<!--preload-->', inject);
        res.write(withPreload);
        res.end();
      },
    });
  } catch (e) {
    vite.ssrFixStacktrace(e as Error);
    next(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
