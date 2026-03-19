import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Search, CarFront } from 'lucide-react';
import { locations, vehicles, getPrice } from '../data/pricing';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import CheckoutModal from './CheckoutModal';

export default function BookingWidget() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [pax, setPax] = useState('1');
  
  const [showResults, setShowResults] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const { language, t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="w-full max-w-5xl mx-auto glass-panel rounded-[2rem] shadow-2xl overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">{t('booking.title')}</h2>
        
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
              />
            </div>
          </div>

          <div className="relative md:col-span-1 flex items-end">
            <button 
              type="submit"
              className="w-full py-3.5 px-4 bg-white hover:bg-white/90 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>{t('booking.search')}</span>
            </button>
          </div>
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
                const price = getPrice(from, to, vehicle.id);
                if (!price) return null;

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
                          <div className="text-2xl font-bold text-white">€{price}</div>
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
              
              {!vehicles.some(v => v.pax >= parseInt(pax) && getPrice(from, to, v.id) !== null) && (
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
          }}
          price={getPrice(from, to, selectedVehicle.id) || 0}
          vehicleName={selectedVehicle.name[language]}
        />
      )}
    </div>
  );
}
