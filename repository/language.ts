import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getAllLanguages(limit?: number, page?: number) {
    return `/languages?${limit && `limit=${limit}`}${page && `&page=${page}`}`;
  },
  createLanguage() {
    return `/languages`;
  },
  updateLanguage(id: string) {
    return `/languages/${id}`;
  },
};

const hooks = {
  useAllLanguages(limit?: number, page?: number) {
    return useSWR(url.getAllLanguages(limit, page), http.fetcher);
  },
};

const api = {
  createLanguage(data: any) {
    return http.post(url.createLanguage()).send(data);
  },
  updateLanguage(id: string, data: any) {
    return http.put(url.updateLanguage(id)).send(data);
  },
};

export const languagesRepository = {
  url,
  hooks,
  api,
};
