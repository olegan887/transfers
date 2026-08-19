import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Tag, Copy, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { DEFAULT_PROMO_CODE, ENABLE_EXIT_INTENT_POPUP } from '../config';

export default function ExitIntentPopup() {
  if (!ENABLE_EXIT_INTENT_POPUP) {
    return null;
  }

  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // Check if we already showed it in this session
    const hasShown = sessionStorage.getItem('exit_intent_shown');
    if (hasShown) return;

    const triggerPopup = () => {
      setIsVisible(true);
      sessionStorage.setItem('exit_intent_shown', 'true');
      cleanup();
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves the top of the viewport (intent to close tab/type new URL)
      if (e.clientY <= 0) {
        triggerPopup();
      }
    };

    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;
      const scrollDiff = lastScrollY - currentScrollY;

      // If scrolling up
      if (timeDiff > 0 && scrollDiff > 0) {
        const speed = scrollDiff / timeDiff;
        // Mobile exit intent: fast scroll up near the top of the page
        if (speed > 1.5 && currentScrollY < 300) {
          triggerPopup();
        }
      }
      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };

    const cleanup = () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('scroll', handleScroll);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('scroll', handleScroll, { passive: true });

    return cleanup;
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(DEFAULT_PROMO_CODE);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      closePopup();
    }, 2000);
  };

  const closePopup = () => {
    setIsVisible(false);
  };

  const content = {
    en: {
      title: "WAIT! DON'T LEAVE! 🚕💨",
      text: "We were just starting to like you! Let us bribe you to stay. Grab 5% OFF your next transfer right now.",
      codeLabel: "USE PROMO CODE:",
      code: DEFAULT_PROMO_CODE,
      btnCopy: "COPY CODE & STAY",
      btnCopied: "COPIED!",
      btnClose: "No thanks, I prefer paying full price"
    },
    ru: {
      title: "ПОСТОЙТЕ! НЕ УХОДИТЕ! 🚕💨",
      text: "Вы нам только начали нравиться! Позвольте нам вас подкупить. Держите скидку 5% на ваш трансфер прямо сейчас.",
      codeLabel: "ИСПОЛЬЗУЙТЕ ПРОМОКОД:",
      code: DEFAULT_PROMO_CODE,
      btnCopy: "СКОПИРОВАТЬ И ОСТАТЬСЯ",
      btnCopied: "СКОПИРОВАНО!",
      btnClose: "Нет, спасибо, я люблю платить полную цену"
    }
  };


  const currentContent = content[language];

  const modalContent = (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={closePopup}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -2 }}
            exit={{ opacity: 0, scale: 0.9, y: 40, rotate: 5 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="relative w-full max-w-lg bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-10 flex flex-col"
          >
            {/* Warning Tape Header */}
            <div className="bg-yellow-400 border-b-4 border-black p-2 flex overflow-hidden whitespace-nowrap">
              <div className="animate-[marquee_10s_linear_infinite] flex items-center gap-4 font-black text-black uppercase tracking-widest">
                <span>ATTENTION</span><span>•</span><span>ВНИМАНИЕ</span><span>•</span>
                <span>ATTENTION</span><span>•</span><span>ВНИМАНИЕ</span><span>•</span>
                <span>ATTENTION</span><span>•</span><span>ВНИМАНИЕ</span><span>•</span>
              </div>
            </div>

            <button 
              onClick={closePopup}
              className="absolute top-12 right-4 p-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all z-20"
            >
              <X className="w-5 h-5 text-black" strokeWidth={3} />
            </button>

            <div className="p-8 text-center bg-white relative">
              {/* Background Doodle */}
              <div className="absolute top-10 left-10 w-20 h-20 border-4 border-black rounded-full opacity-10 pointer-events-none" />
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-yellow-400 opacity-20 transform rotate-45 pointer-events-none" />

              <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter mb-4 leading-tight">
                <span className="bg-red-400 text-white px-3 py-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block transform rotate-2">
                  {currentContent.title.split('!')[0]}!
                </span>
                <br />
                <span className="inline-block mt-4">
                  {currentContent.title.split('!').slice(1).join('!').trim()}
                </span>
              </h2>
              
              <p className="text-lg text-black font-bold mb-8 leading-relaxed">
                {currentContent.text}
              </p>

              <div className="bg-gray-100 border-4 border-black p-6 shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] mb-8 transform rotate-1">
                <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                  {currentContent.codeLabel}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Tag className="w-6 h-6 text-black" />
                  <span className="text-4xl font-black text-black tracking-widest bg-yellow-400 px-4 py-1 border-2 border-black">
                    {currentContent.code}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleCopy}
                  className="brutal-btn w-full py-4 text-xl uppercase flex items-center justify-center gap-2 bg-green-400 hover:bg-green-500"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      {currentContent.btnCopied}
                    </>
                  ) : (
                    <>
                      <Copy className="w-6 h-6" />
                      {currentContent.btnCopy}
                    </>
                  )}
                </button>
                
                <button
                  onClick={closePopup}
                  className="text-xs font-bold text-gray-400 hover:text-black underline uppercase tracking-wider transition-colors"
                >
                  {currentContent.btnClose}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
