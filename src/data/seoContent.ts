export interface ReviewItem {
  id: string;
  author: string;
  route: {
    en: string;
    ru: string;
  };
  date: string;
  rating: number;
  text: {
    en: string;
    ru: string;
  };
}

export interface GlobalFaqItem {
  q: {
    en: string;
    ru: string;
  };
  a: {
    en: string;
    ru: string;
  };
}

export const passengerReviews: ReviewItem[] = [
  {
    id: 'r1',
    author: 'Elena K.',
    route: {
      en: 'Larnaca Airport (LCA) → Limassol',
      ru: 'Аэропорт Ларнака (LCA) → Лимассол',
    },
    date: '2026-10-12',
    rating: 5,
    text: {
      en: 'Flight landed 45 minutes late at night. Our Limassol-based driver tracked it automatically, met us with a sign inside LCA arrivals, and drove us straight to Limassol Marina in a spotless sedan for €75 + €10 night rate as quoted.',
      ru: 'Рейс задержался на 45 минут поздно вечером. Водитель из Лимассола сам отследил посадку, встретил с табличкой в зале прилёта Ларнаки и довёз до Лимассол Марины на чистом седане. Цена €75 + €10 ночной тариф — ровно как в калькуляторе.',
    },
  },
  {
    id: 'r2',
    author: 'Marcus & Hannah W.',
    route: {
      en: 'Paphos Airport (PFO) → Limassol',
      ru: 'Аэропорт Пафос (PFO) → Лимассол',
    },
    date: '2026-09-28',
    rating: 5,
    text: {
      en: 'Booked round trip between Paphos Airport and our hotel in Limassol with two child seats. Both seats were already installed, cold water waiting in the car, and we saved 10% on the return leg back to PFO.',
      ru: 'Заказывали трансфер туда-обратно между аэропортом Пафос и отелем в Лимассоле с двумя детскими креслами. Кресла уже стояли в машине, в салоне была холодная вода, а на обратную дорогу сработала скидка 10%.',
    },
  },
  {
    id: 'r3',
    author: 'Dmitry S.',
    route: {
      en: 'Larnaca Airport (LCA) → Paphos',
      ru: 'Аэропорт Ларнака (LCA) → Пафос',
    },
    date: '2026-10-24',
    rating: 5,
    text: {
      en: 'Paid a €20 deposit online via Stripe and the rest in cash upon arrival in Paphos. Much faster and calmer than changing buses via Limassol with three suitcases. Driver contacted us on WhatsApp before takeoff.',
      ru: 'Внёс депозит €20 картой через Stripe, остаток отдал водителю в Пафосе (€135 итог). Гораздо быстрее и спокойнее автобусов с пересадками. Водитель написал в WhatsApp ещё до нашего вылета.',
    },
  },
];

export const globalAirportFaqs: GlobalFaqItem[] = [
  {
    q: {
      en: 'Which routes and airports in Cyprus do you cover?',
      ru: 'Какие аэропорты и маршруты по Кипру вы обслуживаете?',
    },
    a: {
      en: 'Our fleet is based in Limassol and operates 24/7 private transfers across the island via Limassol: to/from Larnaca Airport (LCA) and Paphos Airport (PFO), as well as intercity rides connecting Limassol, Paphos, Coral Bay, Peyia, Polis, Larnaca, Nicosia, Ayia Napa, and Protaras.',
      ru: 'Наша база расположена в Лимассоле, откуда мы выполняем круглосуточные трансферы по острову через Лимассол: из/в аэропорты Ларнаки (LCA) и Пафоса (PFO), а также междугородние поездки между Лимассолом, Пафосом, Корал Бэй, Пейей, Полисом, Ларнакой, Никосией, Айя-Напой и Протарасом.',
    },
  },
  {
    q: {
      en: 'Is the quoted transfer price really fixed?',
      ru: 'Цена поездки действительно фиксированная?',
    },
    a: {
      en: 'Yes. The fare shown in our calculator is final per vehicle (up to 4 passengers and 3 suitcases). There are never extra charges for airport parking, highway traffic, or flight delays. Only rides scheduled between 23:00 and 07:00 include a transparent +€10 night tariff.',
      ru: 'Да. Стоимость в калькуляторе окончательная за весь автомобиль (до 4 пассажиров и 3 чемоданов). Нет никаких скрытых доплат за парковку в аэропорту, пробки или задержку рейса. Для поездок в ночное время (23:00–07:00) сразу отображается ночной тариф +€10.',
    },
  },
  {
    q: {
      en: 'Where will the driver meet me at Larnaca (LCA) or Paphos (PFO) Airport?',
      ru: 'Где именно водитель встретит меня в аэропорту Ларнаки (LCA) или Пафоса (PFO)?',
    },
    a: {
      en: 'After collecting your luggage and passing customs, walk into the main Arrivals Hall. Your driver will be waiting right at the exit holding a sign with your full name and will also message you on WhatsApp or Telegram.',
      ru: 'После получения багажа и выхода в общий зал прилёта ваш водитель будет ждать вас у центрального выхода с именной табличкой и заранее напишет в WhatsApp или Telegram.',
    },
  },
  {
    q: {
      en: 'What happens if my flight arrives late?',
      ru: 'Что делать, если мой самолёт задерживается?',
    },
    a: {
      en: 'Include your flight number during checkout and we monitor your arrival in real time. If your plane is delayed, we automatically shift your pickup time and wait for you free of charge.',
      ru: 'Укажите номер рейса при оформлении заказа — мы отслеживаем посадку в реальном времени. При задержке самолёта время подачи машины сдвигается автоматически и без доплат за ожидание.',
    },
  },
  {
    q: {
      en: 'How do I get the 10% round-trip discount and can I pay a €20 deposit?',
      ru: 'Как получить скидку 10% на обратный путь и можно ли оплатить только депозит?',
    },
    a: {
      en: 'Select "Round trip" in the booking calculator to apply an automatic 10% discount on your return leg. At checkout via Stripe, you can choose to pay either the full fare online or a €20 deposit now with the remainder paid in cash to your driver.',
      ru: 'Переключите калькулятор в режим «Туда и обратно» — скидка 10% применится автоматически. При оплате через Stripe можно оплатить всю сумму сразу или внести депозит €20 онлайн, а остаток передать водителю наличными.',
    },
  },
  {
    q: {
      en: 'Do you provide child car seats and boosters?',
      ru: 'Предоставляете ли вы детские автокресла и бустеры?',
    },
    a: {
      en: 'Yes. Mention the number of children and their ages in the booking comment field so we prepare the appropriate baby seat or booster before pickup.',
      ru: 'Да. Укажите количество детей и их возраст в комментарии при оформлении бронирования, чтобы мы заранее установили подходящее автокресло или бустер.',
    },
  },
];
