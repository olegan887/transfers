/**
 * Standard utility wrapper for sending Google Ads / Analytics / Meta Pixel conversion events.
 */
export function reportConversion(value?: number, currency = 'EUR'): void {
  if (typeof (window as any).gtag_report_conversion === 'function') {
    (window as any).gtag_report_conversion();
  }
  if (typeof (window as any).fbq === 'function') {
    (window as any).fbq('track', 'Purchase', {
      value: value || 1.0,
      currency: currency
    });
  }
}

export function reportPixelEvent(event: string, params?: Record<string, any>): void {
  if (typeof (window as any).fbq === 'function') {
    (window as any).fbq('track', event, params);
  }
}

