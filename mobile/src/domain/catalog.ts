import type { Area, City, Service, Thread, Worker } from '@/domain/types';

export const household = {
  name: { en: 'Sarah', ar: 'سارة' },
  cityId: 'amman',
};

export const cities: City[] = [
  { id: 'amman', name: { en: 'Amman', ar: 'عمّان' } },
  { id: 'zarqa', name: { en: 'Zarqa', ar: 'الزرقاء' } },
  { id: 'irbid', name: { en: 'Irbid', ar: 'إربد' } },
  { id: 'aqaba', name: { en: 'Aqaba', ar: 'العقبة' } },
];

export const areas: Area[] = [
  { id: 'abdoun', cityId: 'amman', name: { en: 'Abdoun', ar: 'عبدون' } },
  { id: 'sweifieh', cityId: 'amman', name: { en: 'Sweifieh', ar: 'الصويفية' } },
  { id: 'khalda', cityId: 'amman', name: { en: 'Khalda', ar: 'خلدا' } },
  { id: 'dabouq', cityId: 'amman', name: { en: 'Dabouq', ar: 'دابوق' } },
  { id: 'jabal-amman', cityId: 'amman', name: { en: 'Jabal Amman', ar: 'جبل عمّان' } },
  { id: 'shmeisani', cityId: 'amman', name: { en: 'Shmeisani', ar: 'الشميساني' } },
  { id: 'jubeiha', cityId: 'amman', name: { en: 'Jubeiha', ar: 'الجبيهة' } },
  { id: 'russeifa', cityId: 'zarqa', name: { en: 'Russeifa', ar: 'الرصيفة' } },
  { id: 'zarqa-jadida', cityId: 'zarqa', name: { en: 'New Zarqa', ar: 'الزرقاء الجديدة' } },
  { id: 'al-husn', cityId: 'irbid', name: { en: 'Al Husn', ar: 'الحصن' } },
  { id: 'university', cityId: 'irbid', name: { en: 'University Street', ar: 'شارع الجامعة' } },
  { id: 'ayla', cityId: 'aqaba', name: { en: 'Ayla', ar: 'أيلة' } },
  { id: 'aqaba-center', cityId: 'aqaba', name: { en: 'City Center', ar: 'وسط المدينة' } },
];

export const services: Service[] = [
  {
    id: 'home-cleaning',
    name: { en: 'Home Cleaning', ar: 'تنظيف المنزل' },
    summary: {
      en: 'Professional cleaners for a spotless home.',
      ar: 'عاملات تنظيف محترفات لبيت نضيف.',
    },
    description: {
      en: 'A trusted cleaner for kitchens, bathrooms, floors, and the weekly reset your home actually needs.',
      ar: 'عاملة موثوقة للمطبخ والحمامات والأرضيات والترتيب الأسبوعي الذي يحتاجه البيت.',
    },
    category: { en: 'Cleaning', ar: 'تنظيف' },
    priceFrom: 18,
    durationMinutes: 180,
    rating: 4.9,
    reviewCount: 128,
    icon: 'broom',
    featured: true,
  },
  {
    id: 'deep-cleaning',
    name: { en: 'Deep Cleaning', ar: 'تنظيف عميق' },
    summary: {
      en: 'A top-to-bottom clean for corners you usually skip.',
      ar: 'تنظيف شامل للزوايا التي تتجاوزها العادة.',
    },
    description: {
      en: 'Inside cabinets, behind appliances, grout, windows, and the details that make a house feel new.',
      ar: 'داخل الخزائن وخلف الأجهزة والبلاط والنوافذ والتفاصيل التي ترجع للبيت إحساسه.',
    },
    category: { en: 'Cleaning', ar: 'تنظيف' },
    priceFrom: 35,
    durationMinutes: 300,
    rating: 4.8,
    reviewCount: 86,
    icon: 'sparkle',
  },
  {
    id: 'laundry',
    name: { en: 'Laundry & Ironing', ar: 'غسيل وكوي' },
    summary: {
      en: 'Wash, fold, and press clothes at home.',
      ar: 'غسيل وطي وكوي الملابس في البيت.',
    },
    description: {
      en: 'Sorted loads, careful fabrics, and ironing finished before the evening rush.',
      ar: 'فرز الغسيل، عناية بالأقمشة، وكوي جاهز قبل زحمة المساء.',
    },
    category: { en: 'Home care', ar: 'عناية منزلية' },
    priceFrom: 10,
    durationMinutes: 150,
    rating: 4.7,
    reviewCount: 74,
    icon: 'shirt',
  },
  {
    id: 'household',
    name: { en: 'Household Assistance', ar: 'مساعدة منزلية' },
    summary: {
      en: 'Daily chores, organizing, and a house that keeps running.',
      ar: 'أشغال يومية وترتيب وبيت يظل ماشي.',
    },
    description: {
      en: 'Dishes, tidying, beds, and the small jobs that pile up between deeper cleans.',
      ar: 'جلي وترتيب وتجهيز الغرف والأشغال الصغيرة التي تتراكم بين التنظيفات.',
    },
    category: { en: 'Home support', ar: 'دعم منزلي' },
    priceFrom: 20,
    durationMinutes: 240,
    rating: 4.8,
    reviewCount: 93,
    icon: 'home',
  },
  {
    id: 'hourly',
    name: { en: 'Hourly Home Worker', ar: 'عاملة بالساعة' },
    summary: {
      en: 'A trusted worker by the hour, for whatever the house needs.',
      ar: 'عاملة موثوقة بالساعة، حسب ما يحتاج البيت.',
    },
    description: {
      en: 'Book only the time you need. The worker arrives prepared and stays for the agreed hours.',
      ar: 'احجز الوقت الذي تحتاجه فقط. العاملة توصل جاهزة وتبقى للساعات المتفق عليها.',
    },
    category: { en: 'Home workers', ar: 'عاملات منزليات' },
    priceFrom: 5,
    durationMinutes: 60,
    rating: 4.6,
    reviewCount: 61,
    icon: 'clock',
  },
  {
    id: 'move-out',
    name: { en: 'Move-out Cleaning', ar: 'تنظيف الانتقال' },
    summary: {
      en: 'Leave the old home spotless before you hand over the keys.',
      ar: 'سلّم البيت نظيفًا قبل ما تسلّم المفتاح.',
    },
    description: {
      en: 'Empty-home cleaning for apartments and villas across Jordan, ready for the next family.',
      ar: 'تنظيف البيوت الفارغة للشقق والفلل في الأردن، جاهزة للعائلة التالية.',
    },
    category: { en: 'Cleaning', ar: 'تنظيف' },
    priceFrom: 40,
    durationMinutes: 360,
    rating: 4.9,
    reviewCount: 42,
    icon: 'box',
  },
];

export const workers: Worker[] = [
  {
    id: 'sarah-rashid',
    name: { en: 'Sarah Al-Rashid', ar: 'سارة الرشيد' },
    areaId: 'abdoun',
    rating: 4.9,
    jobsCompleted: 214,
    years: 6,
    verified: true,
    serviceIds: ['home-cleaning', 'deep-cleaning'],
  },
  {
    id: 'lina-haddad',
    name: { en: 'Lina Haddad', ar: 'لينا حداد' },
    areaId: 'sweifieh',
    rating: 4.8,
    jobsCompleted: 176,
    years: 5,
    verified: true,
    serviceIds: ['laundry', 'household'],
  },
  {
    id: 'huda-khoury',
    name: { en: 'Huda Khoury', ar: 'هدى خوري' },
    areaId: 'khalda',
    rating: 4.7,
    jobsCompleted: 143,
    years: 4,
    verified: true,
    serviceIds: ['home-cleaning', 'household'],
  },
  {
    id: 'omar-nasser',
    name: { en: 'Omar Nasser', ar: 'عمر ناصر' },
    areaId: 'jabal-amman',
    rating: 4.8,
    jobsCompleted: 121,
    years: 7,
    verified: true,
    serviceIds: ['deep-cleaning', 'move-out'],
  },
  {
    id: 'maya-zuraiqat',
    name: { en: 'Maya Zuraiqat', ar: 'مايا زريقات' },
    areaId: 'dabouq',
    rating: 4.9,
    jobsCompleted: 98,
    years: 3,
    verified: true,
    serviceIds: ['hourly', 'household'],
  },
  {
    id: 'noor-abu-hassan',
    name: { en: 'Noor Abu Hassan', ar: 'نور أبو حسن' },
    areaId: 'shmeisani',
    rating: 4.6,
    jobsCompleted: 87,
    years: 4,
    verified: true,
    serviceIds: ['laundry', 'home-cleaning'],
  },
  {
    id: 'rana-majali',
    name: { en: 'Rana Majali', ar: 'رنا المجالي' },
    areaId: 'russeifa',
    rating: 4.8,
    jobsCompleted: 76,
    years: 5,
    verified: true,
    serviceIds: ['home-cleaning', 'laundry'],
  },
  {
    id: 'farah-qudah',
    name: { en: 'Farah Qudah', ar: 'فرح قudah' },
    areaId: 'al-husn',
    rating: 4.7,
    jobsCompleted: 64,
    years: 3,
    verified: true,
    serviceIds: ['home-cleaning', 'household', 'hourly'],
  },
  {
    id: 'dana-haddadin',
    name: { en: 'Dana Haddadin', ar: 'دانا حدادين' },
    areaId: 'ayla',
    rating: 4.9,
    jobsCompleted: 58,
    years: 4,
    verified: true,
    serviceIds: ['deep-cleaning', 'hourly', 'move-out'],
  },
];

export const threads: Thread[] = [
  {
    id: 'thread-sarah',
    workerId: 'sarah-rashid',
    unread: true,
    messages: [
      {
        id: 'm1',
        from: 'worker',
        text: {
          en: 'I will be at Abdoun at 10 with the supplies.',
          ar: 'بوصل عبدون الساعة ١٠ ومعي مواد التنظيف.',
        },
        sentAt: '09:12',
      },
      {
        id: 'm2',
        from: 'family',
        text: {
          en: 'Perfect. The building code is 1948.',
          ar: 'تمام. رمز العمارة ١٩٤٨.',
        },
        sentAt: '09:18',
      },
    ],
  },
  {
    id: 'thread-lina',
    workerId: 'lina-haddad',
    unread: false,
    messages: [
      {
        id: 'm3',
        from: 'worker',
        text: {
          en: 'Can we move the laundry visit to 3 PM?',
          ar: 'فينا نأجّل الغسيل للساعة ٣؟',
        },
        sentAt: '18:40',
      },
    ],
  },
];

export const visitTimes = ['09:00', '10:00', '12:00', '14:00', '16:00'];

export function cityById(cityId: string) {
  return cities.find((city) => city.id === cityId);
}

export function areaById(areaId: string) {
  return areas.find((area) => area.id === areaId);
}

export function serviceById(serviceId: string) {
  return services.find((service) => service.id === serviceId);
}

export function workerById(workerId: string) {
  return workers.find((worker) => worker.id === workerId);
}

export function areasInCity(cityId: string) {
  return areas.filter((area) => area.cityId === cityId);
}

export function workersFor(serviceId: string, cityId: string) {
  return workers.filter((worker) => {
    if (!worker.serviceIds.includes(serviceId)) {
      return false;
    }

    return areaById(worker.areaId)?.cityId === cityId;
  });
}
