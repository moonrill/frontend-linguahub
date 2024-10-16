import { Event } from './EventTypes';

export type Coupon = {
  id: string;
  name: string;
  description: string;
  status: string;
  expiredAt: string;
  discountPercentage: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  event: Event;
};

export type UserCoupon = {
  id: string;
  isUsed: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  coupon: Coupon;
};
