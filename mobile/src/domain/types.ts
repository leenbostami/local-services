export type Locale = 'en' | 'ar';

export type Localized = Record<Locale, string>;

export type BookingStatus = 'confirmed' | 'pending' | 'issue';

export type ServiceIcon = 'broom' | 'sparkle' | 'shirt' | 'home' | 'clock' | 'box';

export type City = {
  id: string;
  name: Localized;
};

export type Area = {
  id: string;
  cityId: string;
  name: Localized;
};

export type Service = {
  id: string;
  name: Localized;
  summary: Localized;
  description: Localized;
  category: Localized;
  priceFrom: number;
  durationMinutes: number;
  rating: number;
  reviewCount: number;
  icon: ServiceIcon;
  featured?: boolean;
};

export type Worker = {
  id: string;
  name: Localized;
  areaId: string;
  rating: number;
  jobsCompleted: number;
  years: number;
  verified: boolean;
  serviceIds: string[];
};

export type Booking = {
  id: string;
  serviceId: string;
  workerId: string;
  areaId: string;
  date: string;
  time: string;
  price: number;
  status: BookingStatus;
};

export type ChatMessage = {
  id: string;
  from: 'family' | 'worker';
  text: Localized;
  sentAt: string;
};

export type Thread = {
  id: string;
  workerId: string;
  unread: boolean;
  messages: ChatMessage[];
};

export function localize(value: Localized, locale: Locale) {
  return value[locale];
}
