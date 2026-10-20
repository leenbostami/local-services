import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { household, threads as seedThreads } from '@/domain/catalog';
import { upcomingDates } from '@/domain/format';
import type { Booking, Thread } from '@/domain/types';

type DraftBooking = Omit<Booking, 'id'>;

type MarketplaceContextValue = {
  cityId: string;
  setCityId: (cityId: string) => void;
  bookings: Booking[];
  threads: Thread[];
  book: (draft: DraftBooking) => Booking;
  cancelBooking: (bookingId: string) => void;
  markThreadRead: (threadId: string) => void;
};

const MarketplaceContext = createContext<MarketplaceContextValue | null>(null);

function createSeedBookings(): Booking[] {
  const dates = upcomingDates(6);

  return [
    {
      id: 'bk-abdoun',
      serviceId: 'home-cleaning',
      workerId: 'sarah-rashid',
      areaId: 'abdoun',
      date: dates[1] ?? dates[0],
      time: '10:00',
      price: 18,
      status: 'confirmed',
    },
    {
      id: 'bk-sweifieh',
      serviceId: 'laundry',
      workerId: 'lina-haddad',
      areaId: 'sweifieh',
      date: dates[2] ?? dates[0],
      time: '14:00',
      price: 10,
      status: 'pending',
    },
    {
      id: 'bk-khalda',
      serviceId: 'home-cleaning',
      workerId: 'huda-khoury',
      areaId: 'khalda',
      date: dates[4] ?? dates[0],
      time: '09:00',
      price: 18,
      status: 'confirmed',
    },
  ];
}

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [cityId, setCityId] = useState(household.cityId);
  const [bookings, setBookings] = useState<Booking[]>(createSeedBookings);
  const [threads, setThreads] = useState<Thread[]>(seedThreads);

  const value = useMemo<MarketplaceContextValue>(
    () => ({
      cityId,
      setCityId,
      bookings,
      threads,
      book: (draft) => {
        const booking: Booking = { ...draft, id: `bk-${Date.now()}` };
        setBookings((current) => [booking, ...current]);
        return booking;
      },
      cancelBooking: (bookingId) => {
        setBookings((current) => current.filter((booking) => booking.id !== bookingId));
      },
      markThreadRead: (threadId) => {
        setThreads((current) =>
          current.map((thread) => (thread.id === threadId ? { ...thread, unread: false } : thread)),
        );
      },
    }),
    [bookings, cityId, threads],
  );

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace() {
  const value = useContext(MarketplaceContext);

  if (!value) {
    throw new Error('useMarketplace must be used within MarketplaceProvider');
  }

  return value;
}
