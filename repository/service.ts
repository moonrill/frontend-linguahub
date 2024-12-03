import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getAllServices: (page?: number, limit?: number, status?: string, sortBy?: string, order?: string) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    if (status) params.append('status', status.toString());
    if (sortBy) params.append('sortBy', sortBy);
    if (order) params.append('order', order);

    return `/services${params.toString() ? `?${params.toString()}` : ''}`;
  },
  translatorServices: (page?: number, limit?: number) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());

    return `/translators/services${params.toString() ? `?${params.toString()}` : ''}`;
  },
  updateStatus: (id: string) => `/services/${id}/status`,
  createService: () => '/services',
  updateService: (id: string) => `/services/${id}`,
};

const hooks = {
  useGetAllServices: (page?: number, limit?: number, status?: string, sortBy?: string, order?: string) => {
    return useSWR(url.getAllServices(page, limit, status, sortBy, order), http.fetcher);
  },
  useTranslatorServices: (page?: number, limit?: number) => {
    return useSWR(url.translatorServices(page, limit), http.fetcher);
  },
};

const api = {
  toggleStatus: (id: string) => http.put(url.updateStatus(id)),
  createService: (data: any) => http.post(url.createService()).send(data),
  updateService: (id: string, data: any) => http.put(url.updateService(id)).send(data),
};

export const serviceRepository = {
  url,
  hooks,
  api,
};
