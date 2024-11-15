import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getAllLanguages(
    limit?: number,
    page?: number,
    orderBy?: string,
    direction?: string
  ) {
    const params = new URLSearchParams();

    if (limit) params.append('limit', limit.toString());
    if (page) params.append('page', page.toString());
    if (orderBy) params.append('orderBy', orderBy.toString());
    if (direction) params.append('direction', direction.toString());

    return `/languages${params.toString() ? `?${params.toString()}` : ''}`;
  },
  createLanguage() {
    return `/languages`;
  },
  updateLanguage(id: string) {
    return `/languages/${id}`;
  },
};

const hooks = {
  useAllLanguages(
    limit?: number,
    page?: number,
    orderBy?: string,
    direction?: string
  ) {
    return useSWR(
      url.getAllLanguages(limit, page, orderBy, direction),
      http.fetcher
    );
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
