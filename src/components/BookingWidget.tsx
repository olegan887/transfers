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

  return (
    <div className="w-full max-w-5xl mx-auto glass-panel rounded-[2rem] shadow-2xl overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white tracking-tight">{t('booking.title')}</h2>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider rounded-full border border-green-500/30">
              {language === 'ru' ? '-10% на обратный путь' : '10% OFF Round Trip'}
            </span>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
            <button
              onClick={() => setIsRoundTrip(false)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${!isRoundTrip ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              {t('booking.oneWay')}
            </button>
            <button
              onClick={() => setIsRoundTrip(true)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${isRoundTrip ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              {t('booking.roundTrip')}
            </button>
          </div>
        </div>

        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-200 text-sm flex items-start gap-3">
          <Clock className="w-5 h-5 shrink-0 text-blue-400" />
          <p>{t('booking.notice24h')}</p>
        </div>
        
        {errorDetails && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            <p className="font-bold mb-1">Google Sheets Connection Error:</p>
            <p>{errorDetails}</p>
            <p className="mt-2 text-xs opacity-80">
              To fix this: Go to your Google Sheet &rarr; Extensions &rarr; Apps Script &rarr; Deploy &rarr; Manage deployments &rarr; Edit (pencil icon) &rarr; Ensure "Execute as" is "Me" and "Who has access" is "Anyone" &rarr; Deploy.
            </p>
          </div>
        )}

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative md:col-span-2">
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">{t('booking.from')}</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
              <select 
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 glass-input rounded-xl appearance-none transition-all"
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
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">{t('booking.to')}</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
              <select 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 glass-input rounded-xl appearance-none transition-all"
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
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">{t('booking.passengers')}</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
              <select 
                value={pax}
                onChange={(e) => setPax(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 glass-input rounded-xl appearance-none transition-all"
              >
                {[1,2,3,4].map(n => (
                  <option key={n} value={n}>{n} {getPaxText(n)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative md:col-span-2">
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">{t('booking.date')}</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 glass-input rounded-xl transition-all [color-scheme:dark]"
                required
                lang={language === 'ru' ? 'ru-RU' : 'en-GB'}
              />
            </div>
          </div>

          <div className="relative md:col-span-2">
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">{t('booking.time')}</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 glass-input rounded-xl transition-all [color-scheme:dark]"
                required
                lang={language === 'ru' ? 'ru-RU' : 'en-GB'}
              />
            </div>
          </div>

          {isRoundTrip && (
            <>
              <div className="relative md:col-span-2">
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">{t('booking.returnDate')}</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input 
                    type="date" 
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 glass-input rounded-xl transition-all [color-scheme:dark]"
                    required={isRoundTrip}
                    lang={language === 'ru' ? 'ru-RU' : 'en-GB'}
                  />
                </div>
              </div>

              <div className="relative md:col-span-2">
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">{t('booking.returnTime')}</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input 
                    type="time" 
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 glass-input rounded-xl transition-all [color-scheme:dark]"
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
              className="w-full py-3.5 px-4 bg-white hover:bg-white/90 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>{t('booking.search')}</span>
            </button>
          </div>
          {timeError && (
            <div className="md:col-span-5 text-red-400 text-sm mt-1 font-medium">
              {timeError}
            </div>
          )}
        </form>
      </div>

      {showResults && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white/5 border-t border-white/10 p-6 md:p-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6">{t('booking.results')}</h3>
          
          {from === to ? (
            <div className="text-center py-8 text-white/50">
              {t('booking.sameLocation')}
            </div>
          ) : (
            <div className="space-y-4">
              {vehicles.filter(v => v.pax >= parseInt(pax)).map(vehicle => {
                const basePrice = getBasePrice(from, to);
                if (!basePrice) return null;
                const vehiclePrice = Math.round(basePrice * vehicle.multiplier);
                const totalPrice = calculateTotalPrice(vehiclePrice);
                const originalPrice = calculateOriginalPrice(vehiclePrice);

                return (
                  <div key={vehicle.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-white/10 transition-colors">
                    <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-black/50">
                      <img src={vehicle.image} alt={vehicle.name[language]} className="w-full h-full object-cover opacity-80" />
                    </div>
                    
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-white">{vehicle.name[language]}</h4>
                          <p className="text-white/60 text-sm">{vehicle.description[language]}</p>
                        </div>
                        <div className="text-right">
                          {isRoundTrip && (
                            <div className="text-sm text-white/40 line-through mb-0.5">€{originalPrice}</div>
                          )}
                          <div className="text-2xl font-bold text-green-400">€{totalPrice}</div>
                          <div className="text-xs text-white/40">{t('booking.perVehicle')}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 text-sm text-white/60 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{t('booking.upToPax', { n: vehicle.pax })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CarFront className="w-4 h-4" />
                          <span>{t('booking.upToBags', { n: vehicle.bags })}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button 
                          onClick={() => handleBook(vehicle)}
                          className="px-6 py-2 bg-white hover:bg-white/90 text-black rounded-lg font-bold transition-colors"
                        >
                          {t('booking.book')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {!vehicles.some(v => v.pax >= parseInt(pax) && getBasePrice(from, to) !== null) && (
                <div className="text-center py-8 text-white/50">
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
