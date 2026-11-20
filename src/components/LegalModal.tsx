import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const { t } = useLanguage();

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

  const title = type === 'terms' ? t('legal.termsTitle') : t('legal.privacyTitle');
  const body = type === 'terms' ? t('legal.termsBody') : t('legal.privacyBody');

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl max-h-[85vh] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col transform -rotate-1"
          >
            <div className="flex items-center justify-between p-6 border-b-4 border-black bg-yellow-400">
              <h2 className="text-2xl font-black text-black uppercase tracking-tight">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-black hover:bg-white border-2 border-transparent hover:border-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <X className="w-6 h-6" strokeWidth={3} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar bg-white">
              <div className="prose max-w-none">
                {body.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="text-black font-medium mb-4 leading-relaxed whitespace-pre-line">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
