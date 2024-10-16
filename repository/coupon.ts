import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getAllCoupons: (
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
};

const hooks = {
  useAllCoupons: (
    status: string,
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'expiredDate',
    order: string = 'asc'
  ) => {
    return useSWR(
      url.getAllCoupons(status, page, limit, sortBy, order),
      http.fetcher
    );
  },
};

export const couponRepository = {
  url,
  hooks,
};
