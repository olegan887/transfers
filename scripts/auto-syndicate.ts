import { airportRoutes } from '../src/data/routes';
import { blogPosts } from '../src/data/blog';

const SITE_URL = 'https://cyprus-airport-transfer.co';

interface SyndicationItem {
  kind: 'route' | 'blog';
  slug: string;
  enTitle: string;
  ruTitle: string;
  enSummary: string;
  ruSummary: string;
  enUrl: string;
  ruUrl: string;
  highlightsEn: string[];
  highlightsRu: string[];
}

function buildPool(): SyndicationItem[] {
  const routePool: SyndicationItem[] = airportRoutes.map((r) => ({
    kind: 'route',
    slug: r.slug,
    enTitle: `${r.en.h1} — Fixed €${r.basePrice}`,
    ruTitle: `${r.ru.h1} — фиксированно €${r.basePrice}`,
    enSummary: r.en.subtitle,
    ruSummary: r.ru.subtitle,
    enUrl: `${SITE_URL}/routes/${r.slug}?utm_source=syndication&utm_medium=social`,
    ruUrl: `${SITE_URL}/ru/routes/${r.slug}?utm_source=syndication&utm_medium=social`,
    highlightsEn: r.en.highlights,
    highlightsRu: r.ru.highlights,
  }));

  const blogPool: SyndicationItem[] = blogPosts.map((p) => ({
    kind: 'blog',
    slug: p.slug,
    enTitle: p.title.en,
    ruTitle: p.title.ru,
    enSummary: p.excerpt.en,
    ruSummary: p.excerpt.ru,
    enUrl: `${SITE_URL}/blog/${p.slug}?utm_source=syndication&utm_medium=social`,
    ruUrl: `${SITE_URL}/ru/blog/${p.slug}?utm_source=syndication&utm_medium=social`,
    highlightsEn: [
      'Fixed sedan rates €75–€200 (up to 4 passengers & 3 suitcases)',
      'Limassol dispatch base, 24/7 airport meet & greet, −10% round trip',
    ],
    highlightsRu: [
      'Фиксированные тарифы €75–€200 (до 4 пассажиров и 3 чемоданов)',
      'База в Лимассоле, встреча 24/7 с табличкой, −10% на обратный путь',
    ],
  }));

  // Interleave routes and blog posts for balanced external updates
  const pool: SyndicationItem[] = [];
  const maxLen = Math.max(routePool.length, blogPool.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < routePool.length) pool.push(routePool[i]);
    if (i < blogPool.length) pool.push(blogPool[i]);
  }
  return pool;
}

async function publishToTelegraph(item: SyndicationItem, lang: 'en' | 'ru') {
  const token = process.env.TELEGRAPH_ACCESS_TOKEN?.trim();
  if (!token) {
    console.log('TELEGRAPH_ACCESS_TOKEN not configured — skipping Telegraph post.');
    return null;
  }

  const isRu = lang === 'ru';
  const title = isRu ? item.ruTitle : item.enTitle;
  const summary = isRu ? item.ruSummary : item.enSummary;
  const url = isRu ? item.ruUrl : item.enUrl;
  const highlights = isRu ? item.highlightsRu : item.highlightsEn;

  const content = [
    { tag: 'p', children: [summary] },
    {
      tag: 'ul',
      children: highlights.map((h) => ({ tag: 'li', children: [h] })),
    },
    {
      tag: 'p',
      children: [
        {
          tag: 'a',
          attrs: { href: url },
          children: [
            isRu
              ? 'Рассчитать цену и забронировать трансфер →'
              : 'Check live availability & book fixed rate →',
          ],
        },
      ],
    },
    {
      tag: 'p',
      children: [
        isRu ? 'Калькулятор для отелей и блогов: ' : 'Free calculator widget for Cyprus websites: ',
        {
          tag: 'a',
          attrs: { href: `${SITE_URL}${isRu ? '/ru/widget' : '/widget'}` },
          children: [`${SITE_URL}${isRu ? '/ru/widget' : '/widget'}`],
        },
      ],
    },
  ];

  const response = await fetch('https://api.telegra.ph/createPage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_token: token,
      title,
      author_name: 'Cyprus Airport Transfers (Limassol)',
      author_url: `${SITE_URL}/`,
      content,
      return_content: false,
    }),
  });

  const data = (await response.json()) as { ok: boolean; result?: { url: string }; error?: string };
  if (data.ok && data.result?.url) {
    console.log(`Published Telegraph page (${lang}): ${data.result.url}`);
    return data.result.url;
  }
  console.warn('Telegraph API error:', data.error || response.status);
  return null;
}

async function publishToTelegram(item: SyndicationItem, telegraphUrl?: string | null) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHANNEL_ID?.trim();
  if (!botToken || !chatId) {
    console.log('TELEGRAM_BOT_TOKEN or TELEGRAM_CHANNEL_ID not configured — skipping Telegram post.');
    return;
  }

  const lines = [
    `🚕 <b>${item.ruTitle}</b>`,
    '',
    item.ruSummary,
    '',
    `🇬🇧 ${item.enTitle}`,
    '',
    `👉 <a href="${item.ruUrl}">Забронировать (RU)</a> | <a href="${item.enUrl}">Book Online (EN)</a>`,
  ];

  if (telegraphUrl) {
    lines.push(`📄 <a href="${telegraphUrl}">Подробнее / Read article</a>`);
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join('\n'),
      parse_mode: 'HTML',
      disable_web_page_preview: false,
    }),
  });

  if (response.ok) {
    console.log('Published teaser post to Telegram channel.');
  } else {
    const errText = await response.text().catch(() => '');
    console.warn(`Telegram API returned ${response.status}: ${errText}`);
  }
}

async function publishToWebhook(item: SyndicationItem) {
  const webhookUrl = process.env.SYNDICATION_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return;
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });

  console.log(`Posted item "${item.slug}" to SYNDICATION_WEBHOOK_URL (HTTP ${response.status}).`);
}

async function main() {
  const pool = buildPool();
  const indexArg = process.argv.find((a) => a.startsWith('--index='));
  const isDryRun = process.argv.includes('--dry-run');

  // Rotate deterministically every 2 days across all 64 items
  const defaultIdx = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 2)) % pool.length;
  const idx = indexArg ? Math.abs(Number(indexArg.split('=')[1]) || 0) % pool.length : defaultIdx;
  const item = pool[idx];
  const lang: 'en' | 'ru' = idx % 2 === 0 ? 'ru' : 'en';

  console.log(`Selected rotation item [${idx}/${pool.length - 1}] (${lang.toUpperCase()}): ${item.slug}`);
  console.log(`EN URL: ${item.enUrl}`);
  console.log(`RU URL: ${item.ruUrl}`);

  if (isDryRun) {
    console.log('Dry run complete. Preview payload:', JSON.stringify(item, null, 2));
    return;
  }

  const telegraphUrl = await publishToTelegraph(item, lang);
  await publishToTelegram(item, telegraphUrl);
  await publishToWebhook(item);
}

main().catch((err) => {
  console.warn('Auto-syndicate warning:', err instanceof Error ? err.message : String(err));
  process.exit(0);
});
