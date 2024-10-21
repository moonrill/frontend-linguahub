import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getAllEvents: (limit?: number, page?: number, status?: string) => {
    return `/events?${limit && `limit=${limit}`}${page && `&page=${page}`}${
      status ? `&status=${status}` : ''
    }`;
  },
  getEventById: (id: string) => `/events/${id}`,
};

const hooks = {
  useAllEvents: (limit?: number, page?: number, status?: string) => {
    return useSWR(url.getAllEvents(limit, page, status), http.fetcher);
  },
  useGetEventById: (id: string) => {
    return useSWR(url.getEventById(id), http.fetcher);
  },
};

export const eventRepository = {
  url,
  hooks,
};
