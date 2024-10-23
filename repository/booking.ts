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
  getTranslatorBookings: (
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
    const url = `/translators/bookings${queryString ? `?${queryString}` : ''}`;

    return url;
  },
  getBookingById: (id: string) => `/bookings/${id}`,
  completeBooking: (id: string) => `/bookings/${id}/complete`,
  cancelBooking: (id: string) => `/bookings/${id}/cancel`,
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
  useTranslatorBookings: (
    page: number,
    limit: number,
    status?: string,
    sortBy?: string,
    order?: string
  ) => {
    return useSWR(
      url.getTranslatorBookings(status, page, limit, sortBy, order),
      http.fetcher
    );
  },
  useGetBookingById: (id: string) => {
    return useSWR(url.getBookingById(id), http.fetcher);
  },
};

const manipulateData = {
  completeBooking: (id: string) => {
    return http.put(url.completeBooking(id));
  },
  cancelBooking: (id: string) => {
    return http.put(url.cancelBooking(id));
  },
};

export const bookingRepository = {
  url,
  hooks,
  manipulateData,
};
