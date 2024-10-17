import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getUserBookings: (
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
    const url = `/users/bookings${queryString ? `?${queryString}` : ''}`;

    return url;
  },
};

const hooks = {
  useUserBookings: (
    status: string | undefined,
    page: number,
    limit: number,
    sortBy?: string,
    order?: string
  ) => {
    return useSWR(
      url.getUserBookings(status, page, limit, sortBy, order),
      http.fetcher
    );
  },
};

export const bookingRepository = {
  url,
  hooks,
};
