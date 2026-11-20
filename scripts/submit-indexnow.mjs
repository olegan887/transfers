import fs from 'fs';
import path from 'path';

const HOST = 'cyprus-airport-transfer.co';
const KEY = '4e8b2c9a1d7f46039c5e8a21b4d70f38';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const delayArg = process.argv.find((arg) => arg.startsWith('--delay='));
const delayMs = delayArg ? Number(delayArg.split('=')[1]) || 0 : 0;

function readSitemapUrls() {
  const candidates = [
    path.resolve(process.cwd(), 'dist/sitemap.xml'),
    path.resolve(process.cwd(), 'public/sitemap.xml'),
  ];
  const sitemapPath = candidates.find((p) => fs.existsSync(p));
  if (!sitemapPath) {
    throw new Error('Could not find dist/sitemap.xml or public/sitemap.xml');
  }
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [];
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }
  return Array.from(new Set(urls));
}

async function main() {
  const urlList = readSitemapUrls();
  if (urlList.length === 0) {
    console.log('No URLs found in sitemap. Skipping IndexNow submission.');
    return;
  }

  if (delayMs > 0) {
    console.log(`Waiting ${delayMs / 1000}s for GitHub Pages CDN propagation...`);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  console.log(`Submitting ${urlList.length} URLs to IndexNow (Bing & Yandex)...`);
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text().catch(() => '');
    if (response.ok || response.status === 202) {
      console.log(`IndexNow submission succeeded (HTTP ${response.status}).`);
    } else {
      console.warn(
        `IndexNow returned HTTP ${response.status}${responseText ? `: ${responseText}` : ''}. Continuing without failing deploy.`
      );
    }
  } catch (err) {
    console.warn('IndexNow request failed:', err instanceof Error ? err.message : String(err));
  }
}

main();
