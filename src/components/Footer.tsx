import React, { useState } from 'react';
import { Car, MessageCircle, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import LegalModal from './LegalModal';

export default function Footer() {
  const { t } = useLanguage();
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'terms' | 'privacy' }>({
    isOpen: false,
    type: 'terms'
  });

  const openLegal = (e: React.MouseEvent, type: 'terms' | 'privacy') => {
    e.preventDefault();
    setLegalModal({ isOpen: true, type });
  };

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
                <a href="https://wa.me/35796867289" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#25D366] transition-colors">
                  <MessageCircle className="w-4 h-4 text-white/40" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:info@cyprus-airport-transfer.co" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-white/40" />
                  info@cyprus-airport-transfer.co
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-white/40 shrink-0" />
                26 Neofytou Nikolaidi, Paphos 8011, Cyprus
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{t('footer.nav')}</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="/#destinations" className="hover:text-white transition-colors">{t('nav.destinations')}</a></li>
              <li><a href="/#features" className="hover:text-white transition-colors">{t('nav.features')}</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">{t('nav.blog')}</a></li>
              <li><button onClick={(e) => openLegal(e as any, 'terms')} className="hover:text-white transition-colors text-left">{t('footer.terms')}</button></li>
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
              <div className="w-16 h-8 glass-panel rounded flex items-center justify-center text-[10px] font-bold text-white">STRIPE</div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-xs text-center flex flex-col md:flex-row justify-between items-center gap-4 font-light">
          <p>&copy; {new Date().getFullYear()} Cyprus Airport Transfer .co. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <button onClick={(e) => openLegal(e as any, 'privacy')} className="hover:text-white transition-colors">{t('footer.privacy')}</button>
            <button onClick={(e) => openLegal(e as any, 'terms')} className="hover:text-white transition-colors">{t('footer.terms')}</button>
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
