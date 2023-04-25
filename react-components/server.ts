import { readFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

/* import { setupStore } from './src/redux/store';
import { RickMortiResponse } from './src/date/types_date'; */

async function createServer() {
  const app = express();

  const PORT = 8000;

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const htmlIndex = resolve(__dirname, 'index.html');

  const vite = await createViteServer({
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

      res.write(htmlStart);

      const { stream, injectPreload } = await render(url, {
        onShellReady() {
          stream.pipe(res);
        },

        onAllReady() {
          const withPreload = htmlEnd.replace('<!--preload-->', injectPreload());
          res.write(withPreload);
          res.end();
        },
        onError(err: Error) {
          console.error(err);
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
}

createServer();
