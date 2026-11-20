/**
 * Deferred third-party analytics loader & conversion helpers.
 * Keeps gtag/fbq/clarity stubs immediately available while deferring external JS
 * until after page load + idle or first user interaction to protect Core Web Vitals (TBT/INP/LCP).
 */

const GOOGLE_ADS_ID = 'AW-17973746217';
const GOOGLE_ADS_CONVERSION = 'AW-17973746217/CraTCN2Vs4wcEKm0xvpC';
const CLARITY_ID = 'vzu4kcc9x2';
const META_PIXEL_ID = '2782001655390125';

let analyticsInitialized = false;

function ensureStubs(): void {
  if (typeof window === 'undefined') return;
  const w = window as any;

  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== 'function') {
    w.gtag = function () {
      w.dataLayer.push(arguments);
    };
  }

  if (typeof w.gtag_report_conversion !== 'function') {
    w.gtag_report_conversion = function (url?: string) {
      const callback = function () {
        if (typeof url !== 'undefined') {
          window.location.href = url;
        }
      };
      w.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_CONVERSION,
        value: 1.0,
        currency: 'EUR',
        transaction_id: '',
        event_callback: callback,
      });
      return false;
    };
  }

  if (typeof w.fbq !== 'function') {
    const fbqStub: any = function () {
      fbqStub.callMethod
        ? fbqStub.callMethod.apply(fbqStub, arguments)
        : fbqStub.queue.push(arguments);
    };
    fbqStub.push = fbqStub;
    fbqStub.loaded = false;
    fbqStub.version = '2.0';
    fbqStub.queue = [];
    w.fbq = fbqStub;
    if (!w._fbq) w._fbq = fbqStub;
  }
}

function injectExternalScripts(): void {
  if (analyticsInitialized || typeof window === 'undefined' || typeof document === 'undefined') return;
  analyticsInitialized = true;
  ensureStubs();

  const w = window as any;

  // 1. Google Ads gtag.js
  w.gtag('js', new Date());
  w.gtag('config', GOOGLE_ADS_ID);
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  document.head.appendChild(gtagScript);

  // 2. Meta Pixel
  w.fbq('init', META_PIXEL_ID);
  w.fbq('track', 'PageView');
  const fbScript = document.createElement('script');
  fbScript.async = true;
  fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(fbScript);

  // 3. Microsoft Clarity
  w.clarity =
    w.clarity ||
    function () {
      (w.clarity.q = w.clarity.q || []).push(arguments);
    };
  const clarityScript = document.createElement('script');
  clarityScript.async = true;
  clarityScript.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(clarityScript);
}

export function initDeferredAnalytics(): () => void {
  if (typeof window === 'undefined') return () => {};
  ensureStubs();

  let timerId: number | undefined;
  const trigger = () => {
    cleanup();
    injectExternalScripts();
  };

  const onLoad = () => {
    const w = window as any;
    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(trigger, { timeout: 3000 });
    } else {
      timerId = window.setTimeout(trigger, 2500);
    }
  };

  const events = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;
  const cleanup = () => {
    events.forEach((ev) => window.removeEventListener(ev, trigger));
    window.removeEventListener('load', onLoad);
    if (timerId !== undefined) window.clearTimeout(timerId);
  };

  events.forEach((ev) => window.addEventListener(ev, trigger, { once: true, passive: true }));

  if (document.readyState === 'complete') {
    onLoad();
  } else {
    window.addEventListener('load', onLoad, { once: true });
  }

  return cleanup;
}

export function reportConversion(value?: number, currency = 'EUR'): void {
  ensureStubs();
  const w = window as any;
  if (typeof w.gtag_report_conversion === 'function') {
    w.gtag_report_conversion();
  }
  if (typeof w.fbq === 'function') {
    w.fbq('track', 'Purchase', {
      value: value || 1.0,
      currency,
    });
  }
}

export function reportPixelEvent(event: string, params?: Record<string, any>): void {
  ensureStubs();
  const w = window as any;
  if (typeof w.fbq === 'function') {
    w.fbq('track', event, params);
  }
}
