import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const serverless = require('serverless-http');
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine();

// Serve static files from /browser
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  })
);

// Handle all other requests by rendering the Angular application
app.get('**', async (req, res, next) => {

  try {
    const html = await commonEngine.render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
    res.send(html);
  } catch (err) {
    next(err);
  }
});

// Export as a Lambda-compatible handler
export const handler = serverless(app);