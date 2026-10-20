import type { Locale } from '@/domain/types';

const intlLocale = (locale: Locale) => (locale === 'ar' ? 'ar-JO' : 'en-JO');

function number(value: number, locale: Locale) {
  return new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: 0 }).format(value);
}

export function formatMoney(amount: number, locale: Locale) {
  const value = number(amount, locale);
  return locale === 'ar' ? `${value} د.أ` : `${value} JOD`;
}

export function formatRating(rating: number, locale: Locale) {
  return new Intl.NumberFormat(intlLocale(locale), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rating);
}

export function formatCount(count: number, locale: Locale) {
  return number(count, locale);
}

export function formatDay(isoDate: string, locale: Locale) {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${isoDate}T00:00:00`));
}

export function formatTime(time: string, locale: Locale) {
  const [hour, minute] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hour ?? 0, minute ?? 0, 0, 0);

  return new Intl.DateTimeFormat(intlLocale(locale), {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function formatDuration(minutes: number, locale: Locale) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const hourLabel = number(hours, locale);
  const minuteLabel = number(rest, locale);

  if (locale === 'ar') {
    return rest === 0 ? `${hourLabel} س` : `${hourLabel} س ${minuteLabel} د`;
  }

  return rest === 0 ? `${hourLabel} hr` : `${hourLabel} hr ${minuteLabel} min`;
}

export function upcomingDates(count: number) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index + 1);
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');

    return `${date.getFullYear()}-${month}-${day}`;
  });
}

export function greetingKey(date = new Date()) {
  const hour = date.getHours();

  if (hour < 12) {
    return 'greetingMorning' as const;
  }

  if (hour < 17) {
    return 'greetingAfternoon' as const;
  }

  return 'greetingEvening' as const;
}
