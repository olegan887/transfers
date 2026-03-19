import React, { useEffect, useState } from 'react';
import { CheckCircle2, Home } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function SuccessPage() {
  const { t } = useLanguage();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get('session_id'));
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel rounded-3xl p-8 text-center">
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
      </div>
    </div>
  );
}
