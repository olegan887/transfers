import React from 'react';
import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';
import { getPageSeoAsync } from './lib/seo';
import { parseRoute } from './lib/routing';
import { loadTranslation } from './i18n/localeLoader';
import { loadRouteDetails } from './data/routeDetails';

function renderAppToString(element: React.ReactElement): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = '';
    let settled = false;
    const stream = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });
    const { pipe } = renderToPipeableStream(element, {
      onAllReady() {
        pipe(stream);
      },
      onShellError(err) {
        if (!settled) {
          settled = true;
          reject(err);
        }
      },
      onError(err) {
        console.error('SSR stream error:', err);
      },
    });
    stream.on('finish', () => {
      if (!settled) {
        settled = true;
        resolve(html);
      }
    });
    stream.on('error', (err) => {
      if (!settled) {
        settled = true;
        reject(err);
      }
    });
  });
}

export async function render(urlPath: string) {
  const parsed = parseRoute(urlPath);
  await loadTranslation(parsed.lang);
  if (parsed.view === 'route') {
    await loadRouteDetails(parsed.lang);
  }
  const [html, seo] = await Promise.all([
    renderAppToString(<App initialPath={urlPath} />),
    getPageSeoAsync(urlPath),
  ]);
  return { html, seo };
}
