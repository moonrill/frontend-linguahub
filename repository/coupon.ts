import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getAllCoupons: (limit?: number, page?: number, status?: string) =>
    `/coupons?limit=${limit}&page=${page}${status ? `&status=${status}` : ''}`,
  
      getCouponsByEvent: (eventId: string) => `/coupons/event/${eventId}`,
  getCouponById: (id: string) => `/coupons/${id}`,
  createCoupon: () => '/coupons',
  updateCoupon: (id: string) => `/coupons/${id}`,
  deleteCoupon: (id: string) => `/coupons/${id}`,
  getUserCouponsByEvent: (eventId: string) => `/users/coupons?event=${eventId}`,
  claimCoupon: (couponId: string) => `/coupons/claim/${couponId}`,
  getEvents: () => '/events',
};

const hooks = {
  useAllCoupons: (limit?: number, page?: number, status?: string) => {
    return useSWR(url.getAllCoupons(limit, page, status), http.fetcher);
  },
  useCouponsByEvent: (eventId: string) => {
    return useSWR(url.getCouponsByEvent(eventId), http.fetcher);
  },
  useCouponById: (id: string) => {
    return useSWR(id ? url.getCouponById(id) : null, http.fetcher);
  },
  useUserCouponsByEvent: (eventId: string) => {
    return useSWR(url.getUserCouponsByEvent(eventId), http.fetcher);
  },
  useAllEvents: () => {
    return useSWR(url.getEvents(), http.fetcher);
  },
};

const api = {
  createCoupon: (data: any) => http.post(url.createCoupon()).send(data),
  updateCoupon: (id: string, data: any) => http.put(url.updateCoupon(id)).send(data),
  deleteCoupon: (id: string) => http.del(url.deleteCoupon(id)),
  claimCoupon: (couponId: string) => http.post(url.claimCoupon(couponId)),
};

export const couponRepository = {
  url,
  hooks,
  api,
};
