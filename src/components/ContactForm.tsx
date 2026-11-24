import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { getGoogleScriptUrl, safeFetchGoogleScript } from '../lib/utils';
import { reportLead } from '../lib/analytics';
import { handleInvalid } from '../lib/formUtils';

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
        comments: formData.comment,
      };

      const response = await safeFetchGoogleScript(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) {
        throw new Error('Failed to send contact form');
      }

      setStatus('success');
      reportLead('contact_form');
      setFormData({ name: '', phone: '', email: '', comment: '' });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-16 bg-yellow-400 border-t-4 border-black relative overflow-hidden" id="contact">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight uppercase inline-block bg-white px-6 py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {t('contact.title')}
          </h2>
          <p className="text-black font-bold mt-2 text-base md:text-lg">{t('contact.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} onInvalid={handleInvalid} className="brutal-card bg-white p-6 md:p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs font-black text-black uppercase tracking-wider mb-2"
              >
                {t('contact.name')}
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="brutal-input w-full px-4 h-14 text-base"
              />
            </div>
            <div>
              <label
                htmlFor="contact-phone"
                className="block text-xs font-black text-black uppercase tracking-wider mb-2"
              >
                {t('contact.phone')}
              </label>
              <input
                id="contact-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="brutal-input w-full px-4 h-14 text-base"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-black text-black uppercase tracking-wider mb-2"
            >
              {t('contact.email')}
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="brutal-input w-full px-4 h-14 text-base"
            />
          </div>

          <div>
            <label
              htmlFor="contact-comment"
              className="block text-xs font-black text-black uppercase tracking-wider mb-2"
            >
              {t('contact.comment')}
            </label>
            <textarea
              id="contact-comment"
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
            className="brutal-btn w-full h-14 text-lg mt-6"
          >
            {status === 'loading' ? (
              <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin mx-auto" />
            ) : status === 'success' ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-700" />
                <span className="text-green-700">{t('contact.success')}</span>
              </div>
            ) : status === 'error' ? (
              <div className="flex items-center justify-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-700" />
                <span className="text-red-700">{t('contact.error')}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                <span>{t('contact.submit')}</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
