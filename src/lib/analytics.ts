/**
 * Standard utility wrapper for sending Google Ads / Analytics conversion events.
 */
export function reportConversion(): void {
  if (typeof (window as any).gtag_report_conversion === 'function') {
    (window as any).gtag_report_conversion();
  }
}
