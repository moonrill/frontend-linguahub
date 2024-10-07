import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getAllLanguages(limit?: number, page?: number) {
    return `/languages?limit=${limit}&page=${page}`;
  },
};

const hooks = {
  useAllLanguages(limit?: number, page?: number) {
    return useSWR(url.getAllLanguages(limit, page), http.fetcher);
  },
};

export const languagesRepository = {
  url,
  hooks,
};
