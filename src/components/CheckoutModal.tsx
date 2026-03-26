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
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-10 max-h-[95vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b-4 border-black bg-yellow-400">
              <h3 className="text-xl font-black text-black uppercase tracking-tight">{t('booking.checkoutTitle')}</h3>
              <button 
                onClick={onClose}
                className="p-1 text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 md:p-6 overflow-y-auto">
              <div className="mb-6 p-4 bg-gray-50 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-black font-bold text-lg">{bookingData.fromName} → {bookingData.toName}</span>
                  <span className="text-black font-black text-xl">€{price}</span>
                </div>
                <div className="text-gray-600 font-bold text-sm flex flex-wrap gap-x-3 gap-y-1">
                  <span>{bookingData.date} {bookingData.time}</span>
                  {bookingData.isRoundTrip && (
                    <>
                      <span className="text-black">|</span>
                      <span className="text-black">Return: {bookingData.returnDate} {bookingData.returnTime}</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{bookingData.pax} pax</span>
                  <span>•</span>
                  <span>{vehicleName}</span>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-100 border-2 border-red-600 text-red-600 font-bold text-sm shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]">
                  {error}
                </div>
              )}

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">
                      {t('booking.name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="brutal-input w-full px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">
                      {t('booking.phone')}
                    </label>
                    <div className="flex flex-col gap-3">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+357 99 123456"
                        className="brutal-input w-full px-4 py-3"
                      />
                      <div className="flex gap-2">
                        {['whatsapp', 'telegram', 'sms'].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMessenger(m)}
                            className={`flex-1 py-2 text-xs font-black uppercase border-2 border-black transition-all ${
                              messenger === m 
                                ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform translate-x-[1px] translate-y-[1px]' 
                                : 'bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
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
                  <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">
                    {t('booking.flightNumber')}
                  </label>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="brutal-input w-full px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">
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
                    className="brutal-input w-full px-4 py-3"
                    placeholder={language === 'ru' ? 'Введите отель или адрес...' : 'Enter hotel or address...'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">
                    {t('booking.comment')}
                  </label>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="brutal-input w-full px-4 py-3 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">
                    {t('booking.paymentMode')}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('full')}
                      className={`p-4 border-2 border-black text-left transition-all ${
                        paymentMode === 'full'
                          ? 'bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -translate-y-1'
                          : 'bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      }`}
                    >
                      <div className="text-sm font-black text-black uppercase mb-1">{t('booking.payFull')}</div>
                      <div className="text-sm text-black font-bold">€{price}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMode('deposit')}
                      className={`p-4 border-2 border-black text-left transition-all ${
                        paymentMode === 'deposit'
                          ? 'bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -translate-y-1'
                          : 'bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      }`}
                    >
                      <div className="text-sm font-black text-black uppercase mb-1">{t('booking.payDeposit')}</div>
                      <div className="text-sm text-black font-bold">€20 {t('booking.now')}, €{price - 20} {t('booking.cash')}</div>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-4 md:p-6 border-t-4 border-black bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-black font-black uppercase text-lg">{t('booking.totalToPay')}</span>
                <span className="text-3xl font-black text-black">€{paymentMode === 'full' ? price : 20}</span>
              </div>
              <p className="text-xs font-bold text-gray-600 text-center mb-6 uppercase tracking-wider">
                {t('booking.securePayment')}
              </p>
              <button
                form="checkout-form"
                type="submit"
                disabled={isLoading}
                className="brutal-btn w-full py-4 text-xl uppercase flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
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
