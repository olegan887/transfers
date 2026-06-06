import React, { useState } from 'react';
import { Car, MessageCircle, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { getLinkPath } from '../lib/utils';
import LegalModal from './LegalModal';
import Logo from './Logo';

export default function Footer() {
  const { t, language } = useLanguage();
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'terms' | 'privacy' }>({
    isOpen: false,
    type: 'terms'
  });

  const openLegal = (e: React.MouseEvent, type: 'terms' | 'privacy') => {
    e.preventDefault();
    setLegalModal({ isOpen: true, type });
  };

  return (
    <footer className="bg-white text-black py-20 border-t-4 border-black relative overflow-hidden">
      {/* Background Doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 right-1/4 w-32 h-32 border-8 border-black transform rotate-45" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-yellow-400 rounded-full" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-black mb-8">
              <Logo className="scale-125 md:scale-150 origin-left" />
            </div>
            <p className="text-sm leading-relaxed font-bold">
              {t('footer.desc')}
              <br /><br />
              <span className="bg-black text-white px-2 py-1 font-black inline-block transform -rotate-1">
                {language === 'ru' ? '🎁 Скидка 10% на обратный трансфер' : '🎁 10% off return transfers'}
              </span>
            </p>
          </div>

          <div>
            <h4 className="text-black font-black mb-6 uppercase tracking-widest text-sm bg-yellow-400 inline-block px-2 py-1 border-2 border-black transform rotate-1">{t('footer.contacts')}</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li>
                <a href="https://wa.me/35796867289" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#25D366] transition-colors group">
                  <MessageCircle className="w-5 h-5 text-black group-hover:text-[#25D366]" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:info@cyprus-airport-transfer.co" className="flex items-center gap-3 hover:text-yellow-500 transition-colors group">
                  <Mail className="w-5 h-5 text-black group-hover:text-yellow-500" />
                  info@cyprus-airport-transfer.co
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-black shrink-0" />
                26 Neofytou Nikolaidi, Paphos 8011, Cyprus
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-black mb-6 uppercase tracking-widest text-sm bg-yellow-400 inline-block px-2 py-1 border-2 border-black transform -rotate-1">{t('footer.nav')}</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href={getLinkPath('/#destinations')} className="hover:text-yellow-500 transition-colors">{t('nav.destinations')}</a></li>
              <li><a href={getLinkPath('/#features')} className="hover:text-yellow-500 transition-colors">{t('nav.features')}</a></li>
              <li><a href={getLinkPath('/blog')} className="hover:text-yellow-500 transition-colors">{t('nav.blog')}</a></li>
              <li><button onClick={(e) => openLegal(e as any, 'terms')} className="hover:text-yellow-500 transition-colors text-left">{t('footer.terms')}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-black mb-6 uppercase tracking-widest text-sm bg-yellow-400 inline-block px-2 py-1 border-2 border-black transform rotate-1">{t('footer.payment')}</h4>
            <p className="text-sm mb-6 font-bold">
              {t('footer.paymentDesc')}
            </p>
            <div className="flex gap-3">
              <div className="w-12 h-8 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-[10px] font-black text-black">VISA</div>
              <div className="w-12 h-8 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-[10px] font-black text-black">MC</div>
              <div className="w-16 h-8 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-[10px] font-black text-black">STRIPE</div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t-4 border-black text-xs text-center flex flex-col md:flex-row justify-between items-center gap-4 font-bold">
          <p>&copy; {new Date().getFullYear()} Cyprus Airport Transfer .co. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <button onClick={(e) => openLegal(e as any, 'privacy')} className="hover:text-yellow-500 transition-colors uppercase">{t('footer.privacy')}</button>
            <button onClick={(e) => openLegal(e as any, 'terms')} className="hover:text-yellow-500 transition-colors uppercase">{t('footer.terms')}</button>
          </div>
        </div>
      </div>

      <LegalModal 
        isOpen={legalModal.isOpen} 
        type={legalModal.type} 
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })} 
      />
    </footer>
  );
}
