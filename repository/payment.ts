import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getUserPayments: (
    type: 'client' | 'translator',
    status: string | undefined,
    page: number,
    limit: number,
    sortBy?: string,
    order?: string
  ) => {
    const params = new URLSearchParams();

    if (status) {
      params.append('status', status);
    }
    if (page) {
      params.append('page', page.toString());
    }
    if (limit) {
      params.append('limit', limit.toString());
    }
    if (sortBy) {
      params.append('sortBy', sortBy);
    }
    if (order) {
      params.append('order', order);
    }

    const queryString = params.toString();
    let url;
    if (type === 'client') {
      url = `/users/payments${queryString ? `?${queryString}` : ''}`;
    } else {
      url = `/translators/payments${queryString ? `?${queryString}` : ''}`;
    }

    return url;
  },
};

const hooks = {
  useGetUserPayments: (
    type: 'client' | 'translator',
    status: string | undefined,
    page: number,
    limit: number,
    sortBy?: string,
    order?: string
  ) => {
    return useSWR(
      url.getUserPayments(type, status, page, limit, sortBy, order),
      http.fetcher
    );
  },
};

export const paymentRepository = {
  url,
  hooks,
};
