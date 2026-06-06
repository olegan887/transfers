import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Search, CarFront } from 'lucide-react';
import { locations, vehicles } from '../data/pricing';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import CheckoutModal from './CheckoutModal';

export default function BookingWidget() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [pax, setPax] = useState('1');
  const [dateFocused, setDateFocused] = useState(false);
  const [returnDateFocused, setReturnDateFocused] = useState(false);
  
  const [showResults, setShowResults] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [timeError, setTimeError] = useState('');
  const { language, t } = useLanguage();
  const { getBasePrice, isTimeBlocked, errorDetails } = useData();

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      setTimeError('');

      if (date && time) {
        const selectedDateTime = new Date(`${date}T${time}`);
        const minAllowedTime = new Date();
        minAllowedTime.setHours(minAllowedTime.getHours() + 18);

        if (selectedDateTime < minAllowedTime) {
          setTimeError(language === 'ru' 
            ? 'Бронирование онлайн возможно минимум за 18 часов. Для срочного заказа свяжитесь с нами.' 
            : 'Online booking is possible at least 18 hours in advance. For urgent requests, please contact us.');
          return;
        }
      }

      if (isTimeBlocked(date, time)) {
        setTimeError(language === 'ru' ? 'Это время недоступно для бронирования' : 'This time is not available for booking');
        return;
      }

      if (isRoundTrip && returnDate && returnTime) {
        const selectedReturnDateTime = new Date(`${returnDate}T${returnTime}`);
        const minAllowedReturnTime = new Date();
        minAllowedReturnTime.setHours(minAllowedReturnTime.getHours() + 18);

        if (selectedReturnDateTime < minAllowedReturnTime) {
          setTimeError(language === 'ru' 
            ? 'Бронирование обратного рейса возможно минимум за 18 часов.' 
            : 'Return booking is possible at least 18 hours in advance.');
          return;
        }

        if (isTimeBlocked(returnDate, returnTime)) {
          setTimeError(language === 'ru' ? 'Время обратного рейса недоступно' : 'Return time is not available');
          return;
        }
      }

      if (from && to) {
        // Log the search as a lead directly to Google Sheets (Serverless)
        const GOOGLE_SCRIPT_URL = (import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycby6Z_J5r00-EsbLlNZ3OlQFi_RNTU8eVOOTWTMFx4aIN_nBVt-743oxAmYLLBwmxKo/exec').trim().replace(/^["']|["']$/g, '');
        
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // Google Apps Script handles text/plain well to avoid preflight CORS restrictions
          body: JSON.stringify({
            action: 'log_lead',
            status: 'Searched Route',
            pickup: locations.find(l => l.id === from)?.name[language as keyof typeof locations[0]['name']] || from,
            dropoff: locations.find(l => l.id === to)?.name[language as keyof typeof locations[0]['name']] || to,
            date: date,
            time: time,
            passengers: pax,
            comments: `RoundTrip: ${isRoundTrip}`
          })
        }).catch(err => console.error('Failed to log search lead directly', err));

        setShowResults(true);
      }
    };

  const handleBook = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsCheckoutOpen(true);
  };

  const getPaxText = (n: number) => {
    if (language === 'en') {
      return n === 1 ? t('booking.passenger1') : t('booking.passenger2');
    }
    // Russian pluralization
    if (n === 1 || n === 21) return t('booking.passenger1');
    if ([2, 3, 4, 22, 23, 24].includes(n)) return t('booking.passenger2');
    return t('booking.passenger5');
  };

  const calculateTotalPrice = (basePrice: number) => {
    return isRoundTrip ? Math.round(basePrice * 2 * 0.9) : basePrice;
  };

  const calculateOriginalPrice = (basePrice: number) => {
    return isRoundTrip ? basePrice * 2 : basePrice;
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
    <div className="w-full max-w-5xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:16px_16px] opacity-50 pointer-events-none" />
      
      <div className="p-6 md:p-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight uppercase bg-yellow-400 px-4 py-1 border-2 border-black transform -rotate-1">{t('booking.title')}</h2>
            <span className="px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-wider border-2 border-black transform rotate-2">
              {language === 'ru' ? '-10% на обратный путь' : '10% OFF Round Trip'}
            </span>
          </div>
          
          <div className="flex bg-white p-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-fit">
            <button
              onClick={() => setIsRoundTrip(false)}
              className={`px-4 py-1.5 text-sm font-black uppercase transition-all ${!isRoundTrip ? 'bg-yellow-400 text-black border-2 border-black' : 'text-gray-500 hover:text-black'}`}
            >
              {t('booking.oneWay')}
            </button>
            <button
              onClick={() => setIsRoundTrip(true)}
              className={`px-4 py-1.5 text-sm font-black uppercase transition-all ${isRoundTrip ? 'bg-yellow-400 text-black border-2 border-black' : 'text-gray-500 hover:text-black'}`}
            >
              {t('booking.roundTrip')}
            </button>
          </div>
        </div>

        <div className="mb-6 p-4 bg-yellow-100 border-2 border-black text-black font-bold text-sm flex items-start gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Clock className="w-5 h-5 shrink-0 text-black" />
          <p>{t('booking.notice24h')}</p>
        </div>
        
        {errorDetails && (
          <div className="mb-6 p-4 bg-red-100 border-2 border-black text-black font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black mb-1 uppercase">Google Sheets Connection Error:</p>
            <p>{errorDetails}</p>
            <p className="mt-2 text-xs opacity-80 font-medium">
              To fix this: Go to your Google Sheet &rarr; Extensions &rarr; Apps Script &rarr; Deploy &rarr; Manage deployments &rarr; Edit (pencil icon) &rarr; Ensure "Execute as" is "Me" and "Who has access" is "Anyone" &rarr; Deploy.
            </p>
          </div>
        )}

        <form onSubmit={handleSearch} onInvalid={handleInvalid} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative md:col-span-2">
            <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">{t('booking.from')}</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
              <select 
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="brutal-input w-full pl-12 pr-4 h-14 appearance-none text-base bg-white"
                required
              >
                <option value="" disabled>{t('booking.selectPickup')}</option>
                <optgroup label={t('booking.airports')}>
                  {locations.filter(l => l.type === 'airport').map(l => (
                    <option key={l.id} value={l.id}>{l.name[language]}</option>
                  ))}
                </optgroup>
                <optgroup label={t('booking.cities')}>
                  {locations.filter(l => l.type === 'city').map(l => (
                    <option key={l.id} value={l.id}>{l.name[language]}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div className="relative md:col-span-2">
            <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">{t('booking.to')}</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
              <select 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="brutal-input w-full pl-12 pr-4 h-14 appearance-none text-base bg-white"
                required
              >
                <option value="" disabled>{t('booking.selectDropoff')}</option>
                <optgroup label={t('booking.airports')}>
                  {locations.filter(l => l.type === 'airport').map(l => (
                    <option key={l.id} value={l.id}>{l.name[language]}</option>
                  ))}
                </optgroup>
                <optgroup label={t('booking.cities')}>
                  {locations.filter(l => l.type === 'city').map(l => (
                    <option key={l.id} value={l.id}>{l.name[language]}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">{t('booking.passengers')}</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
              <select 
                value={pax}
                onChange={(e) => setPax(e.target.value)}
                className="brutal-input w-full pl-12 pr-4 h-14 appearance-none text-base bg-white"
              >
                {[1,2,3,4].map(n => (
                  <option key={n} value={n}>{n} {getPaxText(n)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative md:col-span-2">
            <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">{t('booking.date')}</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
              <input 
                type={(dateFocused || date) ? "date" : "text"}
                placeholder="DD/MM/YYYY"
                onFocus={() => setDateFocused(true)}
                onBlur={() => setDateFocused(false)}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="brutal-input w-full pl-12 pr-4 h-14 text-base bg-white"
                required
              />
            </div>
          </div>

          <div className="relative md:col-span-2">
            <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">{t('booking.time')}</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="brutal-input w-full pl-12 pr-4 h-14 text-base bg-white"
                required
                lang={language === 'ru' ? 'ru-RU' : 'en-GB'}
              />
            </div>
          </div>

          {isRoundTrip && (
            <>
              <div className="relative md:col-span-2">
                <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">{t('booking.returnDate')}</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                  <input 
                    type={(returnDateFocused || returnDate) ? "date" : "text"}
                    placeholder="DD/MM/YYYY"
                    onFocus={() => setReturnDateFocused(true)}
                    onBlur={() => setReturnDateFocused(false)}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="brutal-input w-full pl-12 pr-4 h-14 text-base bg-white"
                    required={isRoundTrip}
                  />
                </div>
              </div>

              <div className="relative md:col-span-2">
                <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">{t('booking.returnTime')}</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                  <input 
                    type="time" 
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="brutal-input w-full pl-12 pr-4 h-14 text-base bg-white"
                    required={isRoundTrip}
                    lang={language === 'ru' ? 'ru-RU' : 'en-GB'}
                  />
                </div>
              </div>
            </>
          )}

          <div className={`relative flex items-end ${isRoundTrip ? 'md:col-span-1' : 'md:col-span-1'}`}>
            <button 
              type="submit"
              className="brutal-btn w-full h-14 px-4 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>{t('booking.search')}</span>
            </button>
          </div>
          {timeError && (
            <div className="md:col-span-5 text-red-600 bg-red-100 border-2 border-red-600 p-2 text-sm mt-1 font-bold shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]">
              {timeError}
            </div>
          )}
        </form>
      </div>

      {showResults && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-gray-50 border-t-4 border-black p-6 md:p-8 relative z-10"
        >
          <h3 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">{t('booking.results')}</h3>
          
          {from === to ? (
            <div className="text-center py-8 text-black font-bold border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {t('booking.sameLocation')}
            </div>
          ) : (
            <div className="space-y-6">
              {vehicles.filter(v => v.pax >= parseInt(pax)).map(vehicle => {
                const basePrice = getBasePrice(from, to);
                if (!basePrice) return null;
                const vehiclePrice = Math.round(basePrice * vehicle.multiplier);
                const totalPrice = calculateTotalPrice(vehiclePrice);
                const originalPrice = calculateOriginalPrice(vehiclePrice);

                return (
                  <div key={vehicle.id} className="brutal-card bg-white p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-48 h-32 border-4 border-black overflow-hidden shrink-0 bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <img src={vehicle.image} alt={vehicle.name[language]} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-xl font-black text-black uppercase">{vehicle.name[language]}</h4>
                          <p className="text-gray-600 font-bold text-sm">{vehicle.description[language]}</p>
                        </div>
                        <div className="text-right bg-yellow-400 border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform rotate-2">
                          {isRoundTrip && (
                            <div className="text-sm text-black line-through mb-0.5 font-bold">€{originalPrice}</div>
                          )}
                          <div className="text-2xl font-black text-black">€{totalPrice}</div>
                          <div className="text-xs text-black font-bold uppercase">{t('booking.perVehicle')}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 text-sm text-black font-bold mb-6">
                        <div className="flex items-center gap-1 bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <Users className="w-4 h-4" />
                          <span>{t('booking.upToPax', { n: vehicle.pax })}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <CarFront className="w-4 h-4" />
                          <span>{t('booking.upToBags', { n: vehicle.bags })}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button 
                          onClick={() => handleBook(vehicle)}
                          className="brutal-btn px-8 py-2 text-lg uppercase"
                        >
                          {t('booking.book')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {!vehicles.some(v => v.pax >= parseInt(pax) && getBasePrice(from, to) !== null) && (
                <div className="text-center py-8 text-black font-bold border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {t('booking.noOptions')}
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}

      {selectedVehicle && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          bookingData={{
            from,
            to,
            fromName: locations.find(l => l.id === from)?.name[language] || '',
            toName: locations.find(l => l.id === to)?.name[language] || '',
            date,
            time,
            pax,
            isRoundTrip,
            returnDate,
            returnTime
          }}
          price={calculateTotalPrice(Math.round((getBasePrice(from, to) || 0) * selectedVehicle.multiplier))}
          vehicleName={selectedVehicle.name[language]}
        />
      )}
    </div>
  );
}
