import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', comment: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      let GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycby6Z_J5r00-EsbLlNZ3OlQFi_RNTU8eVOOTWTMFx4aIN_nBVt-743oxAmYLLBwmxKo/exec';
      GOOGLE_SCRIPT_URL = GOOGLE_SCRIPT_URL.trim().replace(/^["']|["']$/g, '');
      
      const payload = {
        type: 'contact',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        comments: formData.comment
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

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

  return (
    <section className="py-20 bg-[#050505] border-t border-white/5" id="contact">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('contact.title')}</h2>
          <p className="text-white/60">{t('contact.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 md:p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                {t('contact.name')}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                {t('contact.phone')}
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
              {t('contact.email')}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
              {t('contact.comment')}
            </label>
            <textarea
              required
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-white hover:bg-white/90 disabled:bg-white/50 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mt-6"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : status === 'success' ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-green-600">{t('contact.success')}</span>
              </>
            ) : status === 'error' ? (
              <>
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-600">{t('contact.error')}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t('contact.submit')}
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
