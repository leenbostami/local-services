import type { Locale } from '@/domain/types';

const dictionary = {
  en: {
    greetingMorning: 'Good morning,',
    greetingAfternoon: 'Good afternoon,',
    greetingEvening: 'Good evening,',
    headline: "Let's make your home cleaner and happier.",
    tagline: 'Trusted help for a happier home.',
    searchPlaceholder: 'Search services, areas, or providers',
    popularServices: 'Popular services',
    results: 'Results',
    seeAll: 'See all',
    bookNow: 'Book now',
    home: 'Home',
    bookings: 'Bookings',
    messages: 'Messages',
    profile: 'Profile',
    confirmed: 'Confirmed',
    pending: 'Pending',
    issue: 'Issue',
    verified: 'Verified',
    notifications: 'Notifications',
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
    about: 'About this service',
    workersAvailable: 'Available in your city',
    noWorkers: 'No trusted workers for this service in the selected city yet.',
    chooseArea: 'Neighborhood',
    chooseDay: 'Day',
    chooseTime: 'Time',
    chooseWorker: 'Worker',
    bookingConfirmed: 'Booking confirmed',
    viewBookings: 'View bookings',
    noBookings: 'No visits booked yet.',
    bookAService: 'Find a service',
    cancelBooking: 'Cancel booking',
    keepBooking: 'Keep it',
    cancelTitle: 'Cancel this visit?',
    cancelBody: 'The worker will be released from this time.',
    noMessages: 'Messages from your workers will show up here.',
    emptySearch: 'Nothing matched that search in this city.',
    back: 'Back',
    upcoming: 'Upcoming',
    yourHome: 'Your home',
    jordan: 'Jordan',
    visits: 'Visits',
    workers: 'Workers',
    rating: 'Rating',
  },
  ar: {
    greetingMorning: 'صباح الخير،',
    greetingAfternoon: 'نهارك سعيد،',
    greetingEvening: 'مساء الخير،',
    headline: 'خلّي بيتك أنظف وأريح.',
    tagline: 'مساعدة موثوقة لبيت أريح وأنظف.',
    searchPlaceholder: 'ابحث عن خدمة أو منطقة أو عاملة',
    popularServices: 'الخدمات الأكثر طلبًا',
    results: 'النتائج',
    seeAll: 'عرض الكل',
    bookNow: 'احجز الآن',
    home: 'الرئيسية',
    bookings: 'حجوزاتي',
    messages: 'الرسائل',
    profile: 'حسابي',
    confirmed: 'مؤكد',
    pending: 'قيد الانتظار',
    issue: 'يحتاج متابعة',
    verified: 'موثّقة',
    notifications: 'الإشعارات',
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',
    about: 'عن الخدمة',
    workersAvailable: 'المتاحة في مدينتك',
    noWorkers: 'لا توجد عاملات موثوقات لهذه الخدمة في المدينة المحددة بعد.',
    chooseArea: 'الحي',
    chooseDay: 'اليوم',
    chooseTime: 'الوقت',
    chooseWorker: 'العاملة',
    bookingConfirmed: 'تم تأكيد الحجز',
    viewBookings: 'عرض الحجوزات',
    noBookings: 'ما في زيارات محجوزة بعد.',
    bookAService: 'ابحث عن خدمة',
    cancelBooking: 'إلغاء الحجز',
    keepBooking: 'إبقاؤه',
    cancelTitle: 'إلغاء هذه الزيارة؟',
    cancelBody: 'رح يتفرّغ وقت العاملة.',
    noMessages: 'رسائل العاملات رح تظهر هنا.',
    emptySearch: 'ما في نتائج مطابقة في هذه المدينة.',
    back: 'رجوع',
    upcoming: 'القادمة',
    yourHome: 'بيتك',
    jordan: 'الأردن',
    visits: 'الزيارات',
    workers: 'العاملات',
    rating: 'التقييم',
  },
} as const;

export type Copy = {
  [Key in keyof (typeof dictionary)['en']]: string;
};

export function copyFor(locale: Locale): Copy {
  return dictionary[locale];
}

export function trustedIn(locale: Locale, city: string) {
  return locale === 'ar' ? `موثوقات في ${city}` : `Trusted in ${city}`;
}

export function bookingScheduled(locale: Locale, service: string, when: string) {
  return locale === 'ar' ? `تم جدولة ${service}، ${when}.` : `${service} is scheduled for ${when}.`;
}

export function fromPrice(locale: Locale, price: string) {
  return locale === 'ar' ? `من ${price}` : `From ${price}`;
}

export function yearsLabel(locale: Locale, years: string) {
  return locale === 'ar' ? `${years} سنوات` : `${years} yrs`;
}
