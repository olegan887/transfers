import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { getPageSeo } from './lib/seo';

export function render(urlPath: string) {
  const html = renderToString(<App initialPath={urlPath} />);
  const seo = getPageSeo(urlPath);
  return { html, seo };
}
