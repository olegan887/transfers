import React from 'react';
import { Car, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#050505] text-white/60 py-20 border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <img src="/logo1.png" alt="Cyprus Airport Transfer" className="h-20 md:h-28 object-contain" />
            </div>
            <p className="text-sm leading-relaxed font-light">
              {t('footer.desc')}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{t('footer.contacts')}</h4>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <a href="tel:+35799123456" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-white/40" />
                  +357 99 123 456
                </a>
              </li>
              <li>
                <a href="mailto:info@cyprus-airport-transfer.co" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-white/40" />
                  info@cyprus-airport-transfer.co
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-white/40" />
                Larnaca, Cyprus
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{t('footer.nav')}</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#destinations" className="hover:text-white transition-colors">{t('nav.destinations')}</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">{t('nav.features')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{t('footer.payment')}</h4>
            <p className="text-sm mb-6 font-light">
              {t('footer.paymentDesc')}
            </p>
            <div className="flex gap-3">
              <div className="w-12 h-8 glass-panel rounded flex items-center justify-center text-[10px] font-bold text-white">VISA</div>
              <div className="w-12 h-8 glass-panel rounded flex items-center justify-center text-[10px] font-bold text-white">MC</div>
              <div className="w-12 h-8 glass-panel rounded flex items-center justify-center text-[10px] font-bold text-white">CASH</div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-xs text-center flex flex-col md:flex-row justify-between items-center gap-4 font-light">
          <p>&copy; {new Date().getFullYear()} Cyprus Airport Transfer .co. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
