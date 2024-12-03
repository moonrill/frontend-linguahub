import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getAllSpecializations: (
    limit?: number,
    page?: number,
    orderBy?: string,
    direction?: string
  ) => {
    const params = new URLSearchParams();

    if (limit) params.append('limit', limit.toString());
    if (page) params.append('page', page.toString());
    if (orderBy) params.append('orderBy', orderBy.toString());
    if (direction) params.append('direction', direction.toString());

    return `/specializations${
      params.toString() ? `?${params.toString()}` : ''
    }`;
  },
  getSpecialization: (
    name: string,
    limit?: number,
    page?: number,
    sortBy?: string
  ) => `/specializations/${name}?limit=${limit}&page=${page}&sortBy=${sortBy}`,
  createSpecialization: () => `/specializations`,
  updateSpecialization: (id: string) => `/specializations/${id}`,
  deleteSpecialization: (id: string) => `/specializations/${id}`,
};

const hooks = {
  useAllSpecializations: (
    limit?: number,
    page?: number,
    orderBy?: string,
    direction?: string
  ) => {
    return useSWR(
      url.getAllSpecializations(limit, page, orderBy, direction),
      http.fetcher
    );
  },
  useSpecialization: (
    name: string,
    limit?: number,
    page?: number,
    sortBy?: string
  ) => {
    return useSWR(
      url.getSpecialization(name, limit, page, sortBy),
      http.fetcher
    );
  },
};

const api = {
  createSpecialization(data: any) {
    return http.post(url.createSpecialization()).send(data);
  },
  updateSpecialization(id: string, data: any) {
    return http.put(url.updateSpecialization(id)).send(data);
  },
  deleteSpecialization(id: string) {
    return http.del(url.deleteSpecialization(id));
  },
};

export const specializationRepository = {
  url,
  hooks,
  api,
};
