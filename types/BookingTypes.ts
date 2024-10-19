import { Coupon } from './CouponTypes';
import { Service } from './ServiceTypes';
import { Translator } from './TranslatorTypes';
import { User } from './UserType';

export type Booking = {
  id: string;
  bookingDate: string;
  startAt: string;
  endAt: string;
  duration: number;
  requestStatus: 'pending' | 'approved' | 'rejected' | 'cancelled';
  bookingStatus: 'unpaid' | 'in_progress' | 'completed' | 'cancelled' | null;
  notes: string | null;
  location: string;
  serviceFee: number;
  systemFee: number;
  discountAmount: number | null;
  totalPrice: number;
  rejectionReason: string | null;
  proof: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  service: Service;
  translator?: Translator;
  user?: User;
  coupon?: Coupon;
};
