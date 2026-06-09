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
  const { language } = useLanguage();

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

  const content = {
    terms: {
      en: {
        title: 'Terms of Service',
        body: `
          Last updated: June 1, 2026
          
          1. Acceptance of Terms
          By accessing and using Cyprus Airport Transfer .co, you accept and agree to be bound by the terms and provision of this agreement.
          
          2. Booking and Payments
          All bookings must be made online. We accept major credit cards (Visa, Mastercard, etc.) via Stripe. Full payment is required at the time of booking to secure your transfer.
          
          3. Cancellations and Refunds
          You may cancel your booking free of charge up to 24 hours before the scheduled pickup time. Cancellations made less than 24 hours before the pickup time are non-refundable.
          
          4. Luggage and Passengers
          The number of passengers and luggage must not exceed the capacity of the booked vehicle. We reserve the right to refuse service if these limits are exceeded.
          
          5. Liability
          We are not liable for delays caused by traffic, weather conditions, or other unforeseen circumstances beyond our control.
        `
      },
      ru: {
        title: 'Договор оферты',
        body: `
          Последнее обновление: 1 июня 2026
          
          1. Принятие условий
          Используя сервис Cyprus Airport Transfer .co, вы соглашаетесь с настоящими условиями предоставления услуг.
          
          2. Бронирование и оплата
          Все бронирования осуществляются онлайн. Мы принимаем кредитные карты (Visa, Mastercard и др.) через Stripe. Для подтверждения трансфера требуется полная оплата во время бронирования.
          
          3. Отмена и возврат
          Вы можете бесплатно отменить бронирование за 24 часа до запланированного времени подачи автомобиля. При отмене менее чем за 24 часа оплата не возвращается.
          
          4. Багаж и пассажиры
          Количество пассажиров и багажа не должно превышать вместимость забронированного автомобиля. Мы оставляем за собой право отказать в обслуживании при превышении этих лимитов.
          
          5. Ответственность
          Мы не несем ответственности за задержки, вызванные пробками, погодными условиями или другими непредвиденными обстоятельствами, не зависящими от нас.
        `
      }
    },
    privacy: {
      en: {
        title: 'Privacy Policy',
        body: `
          Last updated: June 1, 2026
          
          1. Information We Collect
          We collect information you provide directly to us when booking a transfer, including your name, email address, phone number, and flight details. Payment information is processed securely by Stripe and is not stored on our servers.
          
          2. How We Use Your Information
          We use the information we collect to process your bookings, communicate with you about your transfer, and improve our services.
          
          3. Information Sharing
          We do not sell or share your personal information with third parties except as necessary to provide our services (e.g., sharing your contact info with your assigned driver).
          
          4. Cookies
          We use cookies to improve your experience on our website and analyze site traffic. You can choose to accept or decline cookies.
          
          5. Your Rights (GDPR)
          If you are a resident of the European Economic Area (EEA), you have the right to access, correct, or delete your personal data. Please contact us to exercise these rights.
        `
      },
      ru: {
        title: 'Политика конфиденциальности',
        body: `
          Последнее обновление: 1 июня 2026
          
          1. Какую информацию мы собираем
          Мы собираем информацию, которую вы предоставляете при бронировании трансфера: имя, email, номер телефона и данные рейса. Платежная информация безопасно обрабатывается сервисом Stripe и не хранится на наших серверах.
          
          2. Как мы используем вашу информацию
          Мы используем собранные данные для обработки ваших заказов, связи с вами по поводу трансфера и улучшения качества наших услуг.
          
          3. Передача информации
          Мы не продаем и не передаем вашу личную информацию третьим лицам, за исключением случаев, необходимых для оказания услуг (например, передача контактных данных вашему водителю).
          
          4. Файлы cookie
          Мы используем файлы cookie для улучшения работы сайта и анализа трафика. Вы можете принять или отклонить использование cookie.
          
          5. Ваши права (GDPR)
          Если вы являетесь резидентом Европейской экономической зоны (ЕЭЗ), вы имеете право на доступ, исправление или удаление ваших персональных данных. Свяжитесь с нами для реализации этих прав.
        `
      }
    }
  };

  const currentContent = content[type][language];

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
              <h2 className="text-2xl font-black text-black uppercase tracking-tight">{currentContent.title}</h2>
              <button 
                onClick={onClose}
                className="p-2 text-black hover:bg-white border-2 border-transparent hover:border-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <X className="w-6 h-6" strokeWidth={3} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar bg-white">
              <div className="prose max-w-none">
                {currentContent.body.split('\n').map((paragraph, idx) => (
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
