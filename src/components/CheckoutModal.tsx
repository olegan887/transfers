import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { loadStripe } from '@stripe/stripe-js';

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
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [address, setAddress] = useState('');
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
      let GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycby6Z_J5r00-EsbLlNZ3OlQFi_RNTU8eVOOTWTMFx4aIN_nBVt-743oxAmYLLBwmxKo/exec';
      GOOGLE_SCRIPT_URL = GOOGLE_SCRIPT_URL.trim().replace(/^["']|["']$/g, '');

      const payload = {
        name,
        phone,
        email: '', 
        pickup: bookingData.fromName,
        dropoff: bookingData.toName,
        date: bookingData.date,
        time: bookingData.time,
        passengers: bookingData.pax,
        vehicle: vehicleName,
        price: price,
        comments: `Flight: ${flightNumber} | Address: ${address}${bookingData.isRoundTrip ? ` | ROUND TRIP: Return on ${bookingData.returnDate} at ${bookingData.returnTime}` : ''}`
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script to not block the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Since mode is 'no-cors', we can't read the JSON response directly.
      // We assume success if the fetch didn't throw a network error.
      if (typeof (window as any).gtag_report_conversion === 'function') {
        (window as any).gtag_report_conversion('/success');
      } else {
        window.location.href = '/success';
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
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                    />
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
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>
              </form>
            </div>

            <div className="p-4 md:p-5 border-t border-white/10 bg-black/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">{t('booking.total')}</span>
                <span className="text-xl font-bold text-white">€{price}</span>
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
                  t('booking.book')
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
