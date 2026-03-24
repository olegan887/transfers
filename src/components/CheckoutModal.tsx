import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { loadStripe } from '@stripe/stripe-js';
import Autocomplete from 'react-google-autocomplete';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    from: string;
    to: string;
    fromName: string;
    toName: string;
    date: string;
    time: string;
    pax: string;
    isRoundTrip: boolean;
    returnDate: string;
    returnTime: string;
  };
  price: number;
  vehicleName: string;
}

export default function CheckoutModal({ isOpen, onClose, bookingData, price, vehicleName }: CheckoutModalProps) {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [messenger, setMessenger] = useState('whatsapp');
  const [flightNumber, setFlightNumber] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [paymentMode, setPaymentMode] = useState<'full' | 'deposit'>('full');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingData: {
            from: bookingData.from,
            to: bookingData.to,
            fromName: bookingData.fromName,
            toName: bookingData.toName,
            date: bookingData.date,
            time: bookingData.time,
            pax: bookingData.pax,
            isRoundTrip: bookingData.isRoundTrip,
            returnDate: bookingData.returnDate,
            returnTime: bookingData.returnTime,
            name,
            phone,
            messenger,
            flightNumber,
            address,
            comment,
            paymentMode,
          },
          price,
          vehicleName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Failed to get checkout URL');
      }
      
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#050505] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[95vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">{t('booking.checkoutTitle')}</h3>
              <button 
                onClick={onClose}
                className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 md:p-5 overflow-y-auto">
              <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-white/60 text-sm">{bookingData.fromName} → {bookingData.toName}</span>
                  <span className="text-white font-bold">€{price}</span>
                </div>
                <div className="text-white/40 text-xs flex flex-wrap gap-x-3 gap-y-1">
                  <span>{bookingData.date} {bookingData.time}</span>
                  {bookingData.isRoundTrip && (
                    <>
                      <span className="text-white/20">|</span>
                      <span className="text-blue-400">Return: {bookingData.returnDate} {bookingData.returnTime}</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{bookingData.pax} pax</span>
                  <span>•</span>
                  <span>{vehicleName}</span>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                      {t('booking.name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                      {t('booking.phone')}
                    </label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+357 99 123456"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                      />
                      <div className="flex gap-1.5">
                        {['whatsapp', 'telegram', 'sms'].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMessenger(m)}
                            className={`flex-1 py-1.5 text-[11px] font-medium rounded-md border transition-colors ${
                              messenger === m 
                                ? 'bg-white/20 border-white/30 text-white' 
                                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
                            }`}
                          >
                            {m === 'whatsapp' ? 'WhatsApp' : m === 'telegram' ? 'Telegram' : 'SMS'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    {t('booking.flightNumber')}
                  </label>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    {t('booking.address')}
                  </label>
                  <Autocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}
                    onPlaceSelected={(place) => {
                      setAddress(place.formatted_address || place.name || '');
                    }}
                    defaultValue={address}
                    onChange={(e: any) => setAddress(e.target.value)}
                    options={{
                      types: ["establishment", "geocode"],
                      componentRestrictions: { country: "cy" },
                    }}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                    placeholder={language === 'ru' ? 'Введите отель или адрес...' : 'Enter hotel or address...'}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    {t('booking.comment')}
                  </label>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    {t('booking.paymentMode')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('full')}
                      className={`p-3 rounded-xl border text-left transition-colors ${
                        paymentMode === 'full'
                          ? 'bg-white/10 border-white/30'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-sm font-bold text-white mb-1">{t('booking.payFull')}</div>
                      <div className="text-xs text-white/60">€{price}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMode('deposit')}
                      className={`p-3 rounded-xl border text-left transition-colors ${
                        paymentMode === 'deposit'
                          ? 'bg-white/10 border-white/30'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-sm font-bold text-white mb-1">{t('booking.payDeposit')}</div>
                      <div className="text-xs text-white/60">€20 {t('booking.now')}, €{price - 20} {t('booking.cash')}</div>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-4 md:p-5 border-t border-white/10 bg-black/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">{t('booking.totalToPay')}</span>
                <span className="text-xl font-bold text-white">€{paymentMode === 'full' ? price : 20}</span>
              </div>
              <p className="text-[10px] text-white/40 text-center mb-4">
                {t('booking.securePayment')}
              </p>
              <button
                form="checkout-form"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-white hover:bg-white/90 disabled:bg-white/50 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  t('booking.pay')
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
