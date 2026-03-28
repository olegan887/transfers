import React from 'react';
import BookingWidget from './BookingWidget';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { Star, Plane, Car, Palmtree, Map, Building, Sun, Plus } from 'lucide-react';

const BackgroundDoodles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Yellow Blob */}
    <svg className="absolute top-0 right-0 w-[600px] h-[600px] text-yellow-400 opacity-20 transform translate-x-1/3 -translate-y-1/4" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18.1,97.5,-2.3C98.2,13.5,93.6,29.6,84.3,43.2C75,56.8,61,67.9,46.1,75.3C31.2,82.7,15.6,86.4,0.1,86.2C-15.4,86,-30.8,82.1,-44.6,74.3C-58.4,66.5,-70.6,54.8,-79.1,41.1C-87.6,27.4,-92.4,11.8,-91.5,-3.4C-90.6,-18.6,-84,-33.4,-74.3,-45.7C-64.6,-58,-51.8,-67.8,-38.1,-75.2C-24.4,-82.6,-12.2,-87.6,1.4,-89.6C15,-91.6,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
    </svg>
    {/* Icons */}
    <Plane className="absolute top-32 left-10 w-8 h-8 text-black opacity-80 transform -rotate-12" strokeWidth={1.5} />
    <Car className="absolute bottom-40 left-20 w-10 h-10 text-black opacity-80 transform rotate-12" strokeWidth={1.5} />
    <Palmtree className="absolute top-40 right-20 w-12 h-12 text-black opacity-80" strokeWidth={1.5} />
    <Map className="absolute bottom-20 right-32 w-10 h-10 text-black opacity-80 transform -rotate-6" strokeWidth={1.5} />
    <Building className="absolute top-1/3 left-1/4 w-8 h-8 text-black opacity-80" strokeWidth={1.5} />
    <Sun className="absolute top-24 right-1/3 w-12 h-12 text-yellow-400 opacity-80 animate-[spin_10s_linear_infinite]" strokeWidth={2} />
    {/* Memphis Shapes */}
    <div className="absolute bottom-1/3 left-10 w-8 h-8 bg-yellow-400 border-2 border-black rounded-full" />
    <div className="absolute top-1/2 right-1/4 flex gap-2">
      <div className="w-3 h-3 bg-black rounded-full" />
      <div className="w-3 h-3 bg-black rounded-full" />
      <div className="w-3 h-3 bg-black rounded-full" />
    </div>
    <Plus className="absolute bottom-1/4 right-10 w-10 h-10 text-black" strokeWidth={3} />
    <Plus className="absolute top-48 left-1/3 w-6 h-6 text-black" strokeWidth={3} />
  </div>
);

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
      <BackgroundDoodles />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-bold text-black">
              {language === 'ru' ? 'Доступно для бронирования 24/7' : 'Available for booking 24/7'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-black mb-6 md:mb-8 tracking-tighter leading-[1.1] uppercase"
          >
            <span className="bg-black text-yellow-400 px-4 py-1 inline-block mb-2 transform -rotate-1">{t('hero.title1')}</span> <br/>
            <span className="bg-yellow-400 text-black px-4 py-1 inline-block transform rotate-1">
              {t('hero.title2')}
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-black max-w-2xl mx-auto font-medium leading-relaxed"
          >
            {t('hero.subtitle')}
            <br className="hidden md:block" />
            <span className="bg-black text-white px-2 py-1 font-bold mt-4 inline-block transform -rotate-1">
              {language === 'ru' ? '🎁 Скидка 10% при заказе трансфера туда-обратно!' : '🎁 10% Discount on all round-trip bookings!'}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=64&h=64"
              ].map((src, i) => (
                <img key={i} src={src} alt="Customer" className="w-10 h-10 rounded-full border-2 border-black object-cover shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
              ))}
            </div>
            <div className="flex flex-col items-center sm:items-start bg-white border-2 border-black px-4 py-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current stroke-black stroke-[1.5px]" />)}
              </div>
              <span className="text-sm text-black font-bold mt-0.5">
                {language === 'ru' ? 'Более 10,000 довольных клиентов' : 'Trusted by 10,000+ travelers'}
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          <BookingWidget />
        </motion.div>
      </div>
    </section>
  );
}
