import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getBookings: (
    role: string,
    status: string | undefined,
    page: number,
    limit: number,
    sortBy?: string
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

    const queryString = params.toString();
    let url;

    switch (role) {
      case 'translator':
        url = `/translators/bookings${queryString ? `?${queryString}` : ''}`;
        break;
      case 'user':
        url = `/users/bookings${queryString ? `?${queryString}` : ''}`;
        break;
      default:
        url = `/bookings${queryString ? `?${queryString}` : ''}`;
    }

    return url;
  },
  getBookingById: (id: string) => `/bookings/${id}`,
  completeBooking: (id: string) => `/bookings/${id}/complete`,
  cancelBooking: (id: string) => `/bookings/${id}/cancel`,
  updateProof: (id: string) => `/bookings/${id}/proof`,
  removeProof: (id: string) => `/bookings/${id}/proof`,
};

const hooks = {
  useGetBookings: (
    role: string,
    status: string | undefined,
    page: number,
    limit: number,
    sortBy?: string
  ) => {
    return useSWR(
      url.getBookings(role, status, page, limit, sortBy),
      http.fetcher
    );
  },
  useGetBookingById: (id: string) => {
    return useSWR(url.getBookingById(id), http.fetcher);
  },
};

const api = {
  completeBooking: (id: string) => {
    return http.put(url.completeBooking(id));
  },
  cancelBooking: (id: string) => {
    return http.put(url.cancelBooking(id));
  },
  updateProof: (id: string, data: any) => {
    return http.put(url.updateProof(id)).send(data);
  },
  removeProof: (id: string) => {
    return http.del(url.removeProof(id));
  },
};

export const bookingRepository = {
  url,
  hooks,
  api,
};
