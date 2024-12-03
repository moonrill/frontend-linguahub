import { Booking } from './BookingTypes';
import { Translator } from './TranslatorTypes';
import { User } from './UserType';

export type Payment = {
  id: string;
  status: 'pending' | 'paid' | 'failed' | 'refund';
  amount: number;
  paymentMethod: string;
  paymentType: 'client' | 'translator';
  token: 'string';
  proof: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  booking: Booking;
  user: User | null;
  translator: Translator | null;
};
