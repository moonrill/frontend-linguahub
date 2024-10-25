import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  translatorServices: (page?: number, limit?: number) =>
    `/translators/services${page && `?page=${page}`}${
      limit && `&limit=${limit}`
    }`,
  updateStatus: (id: string) => `/services/${id}/status`,
};

const hooks = {
  useTranslatorServices: (page?: number, limit?: number) => {
    return useSWR(url.translatorServices(page, limit), http.fetcher);
  },
};

const api = {
  toggleStatus: (id: string) => http.put(url.updateStatus(id)),
};

export const serviceRepository = {
  url,
  hooks,
  api,
};
