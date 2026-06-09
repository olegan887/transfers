import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { getGoogleScriptUrl } from '../lib/utils';

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', comment: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const GOOGLE_SCRIPT_URL = getGoogleScriptUrl();
      
      const payload = {
        type: 'contact',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        comments: formData.comment
      };

      const response = await fetch('/api/google-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Google-Script-Url': GOOGLE_SCRIPT_URL
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to send contact form');
      }

      setStatus('success');
      if (typeof (window as any).gtag_report_conversion === 'function') {
        (window as any).gtag_report_conversion();
      }
      setFormData({ name: '', phone: '', email: '', comment: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleInvalid = (e: React.FormEvent<HTMLFormElement>) => {
    const firstInvalidElement = e.currentTarget.querySelector(':invalid') as HTMLElement;
    if (firstInvalidElement) {
      setTimeout(() => {
        firstInvalidElement.focus();
        firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
  };

  return (
    <section className="py-20 bg-yellow-400 border-y-4 border-black relative overflow-hidden" id="contact">
      {/* Background Doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-8 border-black rounded-full" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-black transform rotate-12" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 border-8 border-black transform -rotate-12" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 tracking-tighter uppercase inline-block bg-white px-6 py-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">{t('contact.title')}</h2>
          <p className="text-black font-bold mt-6 bg-white/50 inline-block px-4 py-2 border-2 border-black transform rotate-1">{t('contact.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} onInvalid={handleInvalid} className="brutal-card bg-white p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-black text-black uppercase tracking-wider mb-2">
                {t('contact.name')}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="brutal-input w-full px-4 h-14 text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-black uppercase tracking-wider mb-2">
                {t('contact.phone')}
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="brutal-input w-full px-4 h-14 text-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-black text-black uppercase tracking-wider mb-2">
              {t('contact.email')}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="brutal-input w-full px-4 h-14 text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-black uppercase tracking-wider mb-2">
              {t('contact.comment')}
            </label>
            <textarea
              required
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="brutal-input w-full px-4 py-4 text-base resize-none min-h-[120px]"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="brutal-btn w-full h-14 text-lg mt-8"
          >
            {status === 'loading' ? (
              <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin mx-auto" />
            ) : status === 'success' ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <span className="text-green-600">{t('contact.success')}</span>
              </div>
            ) : status === 'error' ? (
              <div className="flex items-center justify-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <span className="text-red-600">{t('contact.error')}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Send className="w-6 h-6" />
                {t('contact.submit')}
              </div>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
