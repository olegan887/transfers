import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const title = type === 'terms' ? t('legal.termsTitle') : t('legal.privacyTitle');
  const body = type === 'terms' ? t('legal.termsBody') : t('legal.privacyBody');

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col transform -rotate-1">
        <div className="flex items-center justify-between p-6 border-b-4 border-black bg-yellow-400">
          <h2 className="text-2xl font-black text-black uppercase tracking-tight">{title}</h2>
          <button
            type="button"
            aria-label="Close"
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
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
