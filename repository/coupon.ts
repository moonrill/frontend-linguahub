import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getUserCoupons: (
    status?: string,
    page?: number,
    limit?: number,
    sortBy?: string,
    order?: string
  ) => {
    return `/users/coupons?${
      status &&
      `status=${status}${sortBy && `&sortBy=${sortBy}`}${
        order && `&order=${order}`
      }${page && `&page=${page}`}${limit && `&limit=${limit}`}`
    }`;
  },
  getUserCouponsByEvent: (eventId: string) => {
    return `/users/coupons?event=${eventId}`;
  },
  claimCoupon: (couponId: string) => {
    return `/coupons/claim/${couponId}`;
  },
};

const hooks = {
  useGetUserCoupons: (
    status: string,
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'expiredDate',
    order: string = 'asc'
  ) => {
    return useSWR(
      url.getUserCoupons(status, page, limit, sortBy, order),
      http.fetcher
    );
  },
  useGetUserCouponsByEvent: (eventId: string) => {
    return useSWR(url.getUserCouponsByEvent(eventId), http.fetcher);
  },
};

const api = {
  claimCoupon: (couponId: string) => {
    return http.post(url.claimCoupon(couponId));
  },
};

export const couponRepository = {
  url,
  hooks,
  api,
};
