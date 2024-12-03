import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getAllEvents: (limit?: number, page?: number, status?: string) =>
    `/events?limit=${limit}&page=${page}${status ? `&status=${status}` : ''}`,
  getEventById: (id: string) => `/events/${id}`,
  createEvent: () => `/events`,
  updateEvent: (id: string) => `/events/${id}`,
  deleteEvent: (id: string) => `/events/${id}`,
  eventAll:  () => '/events',
};

const hooks = {
  useAllEvents: (limit?: number, page?: number, status?: string) => {
    return useSWR(url.getAllEvents(limit, page, status), http.fetcher);
  },
  useGetEventById: (id: string) => {
    return useSWR(url.getEventById(id), http.fetcher);
  },

  useGetEventAll: () => {
    return useSWR(url.eventAll(), http.fetcher);
  },

};

const api = {
  createEvent: (data: any) => http.post(url.createEvent()).send(data),
  updateEvent: (id: string, data: any) => http.put(url.updateEvent(id)).send(data),
  deleteEvent: (id: string) => http.del(url.deleteEvent(id)),
};

export const eventRepository = {
  url,
  hooks,
  api,
};
