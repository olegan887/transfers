import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle2, Home, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function SuccessPage() {
  const { t } = useLanguage();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const processedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get('session_id');
    setSessionId(sid);

    if (sid && !processedRef.current) {
      processedRef.current = true;
      verifyAndProcessOrder(sid);
    } else if (!sid) {
      setStatus('error');
      setErrorMessage('No session ID found.');
    }
  }, []);

  const verifyAndProcessOrder = async (sid: string) => {
    try {
      // 1. Verify session with our backend
      const verifyRes = await fetch('/api/verify-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sid })
      });
      
      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.error || verifyData.status || 'Payment verification failed');
      }

      const metadata = verifyData.metadata;

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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel rounded-3xl p-8 text-center">
        
        {status === 'loading' && (
          <div className="py-8">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Verifying Payment...</h2>
            <p className="text-white/60">Please wait while we confirm your order.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="py-8">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Verification Failed</h2>
            <p className="text-red-400 mb-6">{errorMessage}</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full py-4 bg-white hover:bg-white/90 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              {t('booking.backHome') || 'Back to Home'}
            </button>
          </div>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              {t('booking.successTitle') || 'Booking Confirmed!'}
            </h1>
            
            <p className="text-white/60 mb-8">
              {t('booking.successDesc') || 'Thank you for your booking. We have received your request and will contact you shortly to confirm the details.'}
            </p>

            {sessionId && (
              <div className="text-xs text-white/40 mb-8 break-all">
                Order ID: {sessionId}
              </div>
            )}

            <button 
              onClick={() => window.location.href = '/'}
              className="w-full py-4 bg-white hover:bg-white/90 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              {t('booking.backHome') || 'Back to Home'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
