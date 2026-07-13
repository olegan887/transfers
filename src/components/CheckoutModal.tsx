import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { getGoogleScriptUrl, getApiUrl, safeFetchGoogleScript } from '../lib/utils';
import { DEFAULT_PROMO_CODE, DEPOSIT_AMOUNT } from '../config';
import { handleInvalid } from '../lib/formUtils';
import Autocomplete from 'react-google-autocomplete';

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
  const [email, setEmail] = useState('');
  const [messenger, setMessenger] = useState('whatsapp');
  const [flightNumber, setFlightNumber] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [paymentMode, setPaymentMode] = useState<'full' | 'deposit'>('full');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    // Log abandoned checkout directly to Google Sheets if they entered at least a name or phone
    if (name || phone) {
      const GOOGLE_SCRIPT_URL = getGoogleScriptUrl();
      
      safeFetchGoogleScript(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: {
          action: 'log_lead',
          status: 'Abandoned Modal',
          name: name,
          phone: `${phone} (${messenger})`,
          email: email,
          pickup: bookingData.fromName,
          dropoff: bookingData.toName,
          date: bookingData.date,
          time: bookingData.time,
          passengers: bookingData.pax,
          vehicle: vehicleName,
          price: price,
          comments: `Flight: ${flightNumber} | Address: ${address} | Comment: ${comment} | RoundTrip: ${bookingData.isRoundTrip}`
        }
      }).catch(err => console.error('Failed to log abandoned lead directly', err));
    }
    onClose();
  };

  useEffect(() => {
    // Removed auto-apply logic
  }, []);

  const finalPrice = Math.round(price * (1 - discount));
  const canPayDeposit = finalPrice >= DEPOSIT_AMOUNT;

  useEffect(() => {
    if (!canPayDeposit && paymentMode === 'deposit') {
      setPaymentMode('full');
    }
  }, [canPayDeposit, paymentMode]);

  const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value.toUpperCase());
  };


  const handlePromoApply = () => {
    if (promoCode === DEFAULT_PROMO_CODE) {
      setDiscount(0.05);
      setError('');
    } else if (promoCode) {
      setDiscount(0);
      setError(language === 'ru' ? 'Неверный промокод' : 'Invalid promo code');
    } else {
      setDiscount(0);
      setError('');
    }
  };


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

    const GOOGLE_SCRIPT_URL = getGoogleScriptUrl();

    // Log the lead before redirecting
    safeFetchGoogleScript(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: {
        action: 'log_lead',
        status: 'Initiated checkout',
        name: name,
        phone: `${phone} (${messenger})`,
        email: email,
        pickup: bookingData.fromName,
        dropoff: bookingData.toName,
        date: bookingData.date,
        time: bookingData.time,
        passengers: bookingData.pax,
        vehicle: vehicleName,
        price: finalPrice,
        comments: `Flight: ${flightNumber} | Address: ${address} | Comment: ${comment} | RoundTrip: ${bookingData.isRoundTrip}`
      }
    }).catch(err => console.error('Failed to log checkout lead directly', err));

    try {
      // Call Google Apps Script via safeFetchGoogleScript (proxies but has direct fallback)
      const response = await safeFetchGoogleScript(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: {
          action: 'create_stripe_session',
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
            name: name,
            phone: phone,
            messenger: messenger,
            email: email,
            flightNumber: flightNumber,
            address: address,
            comment: comment,
            paymentMode: paymentMode,
          },
          price: finalPrice,
          vehicleName: vehicleName,
          originUrl: window.location.origin + window.location.pathname.replace(/\/$/, '')
        }
      });

      if (!response.ok) {
        throw new Error('Failed to reach booking server');
      }

      const data = await response.json();
      if (data.result === 'success' && data.url) {
        // Redirect directly to Stripe Checkout url!
        window.location.href = data.url;
      } else if (data.result === 'success' && !data.url) {
        throw new Error(
          language === 'ru'
            ? 'Похоже, в Google Apps Script загружена старая версия кода! Шаг 1: скопируйте новый код в Apps Script из файла google-apps-script.js. Шаг 2: пропишите STRIPE_SECRET_KEY в свойствах проекта. Шаг 3: обязательно сделайте «Новое развертывание» (New Deployment).'
            : 'It looks like the old version of Google Apps Script is loaded! Step 1: Copy the new code from google-apps-script.js. Step 2: Configure STRIPE_SECRET_KEY in Script Properties. Step 3: Be sure to deploy it as a "New Deployment".'
        );
      } else {
        throw new Error(data.message || 'Error occurred starting checkout. Please try again.');
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-10 max-h-[98vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-3 border-b-4 border-black bg-yellow-400 shrink-0">
              <h3 className="text-lg font-black text-black uppercase tracking-tight">{t('booking.checkoutTitle')}</h3>
              <button 
                onClick={handleClose}
                className="p-1 text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 md:p-4 overflow-y-auto custom-scrollbar">
              <div className="mb-4 p-3 bg-gray-50 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-black font-bold text-base">{bookingData.fromName} → {bookingData.toName}</span>
                  <div className="text-right">
                    {discount > 0 && (
                      <span className="text-gray-400 line-through text-xs mr-2">€{price}</span>
                    )}
                    <span className="text-black font-black text-lg">€{finalPrice}</span>
                  </div>
                </div>
                <div className="text-gray-600 font-bold text-xs flex flex-wrap gap-x-3 gap-y-1">
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
                <div className="mb-4 p-2 bg-red-100 border-2 border-red-600 text-red-600 font-bold text-xs shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]">
                  {error}
                </div>
              )}

              <form id="checkout-form" onSubmit={handleSubmit} onInvalid={handleInvalid} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase tracking-wider mb-1">
                      {t('booking.name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="brutal-input w-full px-3 h-12 text-base md:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-black uppercase tracking-wider mb-1">
                      {t('contact.email') || 'Email'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="brutal-input w-full px-3 h-12 text-base md:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-black uppercase tracking-wider mb-1">
                    {t('booking.phone')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+357 99 123456"
                      className="brutal-input w-full px-3 h-12 text-base md:text-sm sm:col-span-2"
                    />
                    <div className="flex gap-1 sm:col-span-1">
                      {['whatsapp', 'telegram', 'sms'].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMessenger(m)}
                          className={`flex-1 h-12 text-[10px] font-black uppercase border-2 border-black transition-all ${
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase tracking-wider mb-1">
                      {t('booking.flightNumber')}
                    </label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="brutal-input w-full px-3 h-12 text-base md:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-black uppercase tracking-wider mb-1">
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
                      className="brutal-input w-full px-3 h-12 text-base md:text-sm"
                      placeholder={language === 'ru' ? 'Введите отель или адрес...' : 'Enter hotel or address...'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase tracking-wider mb-1">
                      {t('booking.paymentMode')}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMode('full')}
                        className={`p-3 border-2 border-black text-left transition-all h-full flex flex-col justify-between ${
                          paymentMode === 'full'
                            ? 'bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -translate-y-0.5'
                            : 'bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        }`}
                      >
                        <div className="text-[10px] font-black text-black uppercase mb-1">{t('booking.payFull')}</div>
                        <div className="text-sm text-black font-bold">€{finalPrice}</div>
                      </button>
                      <button
                        type="button"
                        disabled={!canPayDeposit}
                        onClick={() => setPaymentMode('deposit')}
                        className={`p-3 border-2 border-black text-left transition-all h-full flex flex-col justify-between ${
                          !canPayDeposit
                            ? 'opacity-40 cursor-not-allowed bg-gray-100 shadow-none'
                            : paymentMode === 'deposit'
                            ? 'bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -translate-y-0.5'
                            : 'bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        }`}
                      >
                        <div className="text-[10px] font-black text-black uppercase mb-1">{t('booking.payDeposit')}</div>
                        <div className="text-xs text-black font-bold leading-tight">€{DEPOSIT_AMOUNT} {t('booking.now')}<br/>€{Math.max(0, finalPrice - DEPOSIT_AMOUNT)} {t('booking.cash')}</div>
                      </button>
                    </div>
                  </div>


                  <div>
                    <label className="block text-[10px] font-black text-black uppercase tracking-wider mb-1">
                      {language === 'ru' ? 'Промокод' : 'Promo Code'}
                    </label>
                    <div className="flex gap-2 mb-1">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={handlePromoChange}
                        className="brutal-input flex-1 px-3 h-12 text-base md:text-sm uppercase"
                      />
                      <button
                        type="button"
                        onClick={handlePromoApply}
                        className="bg-black text-white px-4 h-12 text-xs font-black uppercase border-2 border-black hover:bg-gray-800 transition-colors whitespace-nowrap"
                      >
                        {language === 'ru' ? 'Применить' : 'Apply'}
                      </button>
                    </div>
                    {discount > 0 && (
                      <div className="text-green-600 font-bold text-[10px] mb-2 uppercase tracking-wider">
                        {language === 'ru' ? '✓ Скидка 5% применена!' : '✓ 5% discount applied!'}
                      </div>
                    )}
                    <label className="block text-[10px] font-black text-black uppercase tracking-wider mb-1 mt-2">
                      {t('booking.comment')}
                    </label>
                    <textarea
                      rows={2}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="brutal-input w-full px-3 py-3 text-base md:text-sm resize-none min-h-[80px]"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="p-3 md:p-4 border-t-4 border-black bg-gray-50 shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-black font-black uppercase text-sm">{t('booking.totalToPay')}</span>
                <span className="text-2xl font-black text-black">€{paymentMode === 'full' ? finalPrice : Math.min(finalPrice, DEPOSIT_AMOUNT)}</span>
              </div>

              <p className="text-[10px] font-bold text-gray-600 text-center mb-3 uppercase tracking-wider">
                {t('booking.securePayment')}
              </p>
              <button
                form="checkout-form"
                type="submit"
                disabled={isLoading}
                className="brutal-btn w-full h-14 text-lg uppercase flex items-center justify-center gap-2"
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
