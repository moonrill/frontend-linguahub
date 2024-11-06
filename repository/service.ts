import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getAllServices: (page?: number, limit?: number) =>
    `/services${page ? `?page=${page}` : ''}${
      limit ? `&limit=${limit}` : ''
    }`,
  translatorServices: (page?: number, limit?: number) =>
    `/translators/services${page ? `?page=${page}` : ''}${
      limit ? `&limit=${limit}` : ''
    }`,
  updateStatus: (id: string) => `/services/${id}/status`,
  createService: () => '/services',
  updateService: (id: string) => `/services/${id}`,
};

const hooks = {
  useTranslatorServices: (page?: number, limit?: number) => {
    return useSWR(url.translatorServices(page, limit), http.fetcher);
  },
  useGetAllServices: (page?: number, limit?: number) => {
    return useSWR(url.getAllServices(page, limit), http.fetcher);
  },
};

const api = {
  toggleStatus: (id: string) => http.put(url.updateStatus(id)),
  createService: (data: any) => http.post(url.createService()).send(data),
  updateService: (id: string, data: any) =>
    http.put(url.updateService(id)).send(data),
};

export const serviceRepository = {
  url,
  hooks,
  api,
};
