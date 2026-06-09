import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle2, Home, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { getGoogleScriptUrl, safeFetchGoogleScript } from '../lib/utils';

export default function SuccessPage() {
  const { t } = useLanguage();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const processedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get('session_id');
    const isDirectSuccess = params.get('direct_success') === 'true';

    if (isDirectSuccess) {
      setSessionId(`LIMO-${new Date().getTime().toString().slice(-6)}`);
      // Trigger Google Ads Conversion if applicable
      if (typeof (window as any).gtag_report_conversion === 'function') {
        (window as any).gtag_report_conversion();
      }
      setStatus('success');
    } else if (sid && !processedRef.current) {
      setSessionId(sid);
      processedRef.current = true;
      verifyAndProcessOrder(sid);
    } else if (!sid) {
      setStatus('error');
      setErrorMessage('No session ID found.');
    }
  }, []);

  const verifyAndProcessOrder = async (sid: string) => {
    try {
      const GOOGLE_SCRIPT_URL = getGoogleScriptUrl();
      // 1. Verify session via safeFetchGoogleScript (tries proxy but falls back to direct call)
      const verifyRes = await safeFetchGoogleScript(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: { 
          action: 'verify_stripe_session',
          sessionId: sid 
        }
      });
      
      if (!verifyRes.ok) {
        throw new Error('Failed to reach validation server');
      }

      const verifyData = await verifyRes.json();

      if (verifyData.result !== 'success' || !verifyData.success) {
        throw new Error(verifyData.message || 'Payment verification failed');
      }

      // 2. Trigger Google Ads Conversion
      if (typeof (window as any).gtag_report_conversion === 'function') {
        (window as any).gtag_report_conversion();
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Order processing error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to process order');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 right-1/4 w-32 h-32 border-8 border-black transform rotate-45" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-yellow-400 rounded-full" />
      </div>

      <div className="max-w-md w-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center relative z-10">
        
        {status === 'loading' && (
          <div className="py-8">
            <Loader2 className="w-16 h-16 text-black animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-2">Verifying Payment...</h2>
            <p className="text-black font-bold">Please wait while we confirm your order.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="py-8">
            <div className="w-24 h-24 bg-red-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full flex items-center justify-center mx-auto mb-8 transform -rotate-6">
              <AlertCircle className="w-12 h-12 text-black" />
            </div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4 bg-red-400 inline-block px-4 py-1 border-2 border-black transform rotate-2">Verification Failed</h2>
            <p className="text-black font-bold mb-8 bg-gray-100 p-4 border-2 border-black">{errorMessage}</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="brutal-btn w-full py-4 text-xl uppercase flex items-center justify-center gap-2"
            >
              <Home className="w-6 h-6" />
              {t('booking.backHome') || 'Back to Home'}
            </button>
          </div>
        )}

        {status === 'success' && (
          <>
            <div className="w-24 h-24 bg-green-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full flex items-center justify-center mx-auto mb-8 transform rotate-6">
              <CheckCircle2 className="w-12 h-12 text-black" />
            </div>
            
            <h1 className="text-3xl font-black text-black uppercase tracking-tight mb-6 bg-yellow-400 inline-block px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
              {t('booking.successTitle') || 'Booking Confirmed!'}
            </h1>
            
            <p className="text-black font-bold text-lg mb-8 leading-relaxed">
              {t('booking.successDesc') || 'Thank you for your booking. We have received your request and will contact you shortly to confirm the details.'}
            </p>

            {sessionId && (
              <div className="text-xs font-bold text-black bg-gray-100 p-3 border-2 border-black mb-8 break-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                Order ID: {sessionId}
              </div>
            )}

            <button 
              onClick={() => window.location.href = '/'}
              className="brutal-btn w-full py-4 text-xl uppercase flex items-center justify-center gap-2"
            >
              <Home className="w-6 h-6" />
              {t('booking.backHome') || 'Back to Home'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
