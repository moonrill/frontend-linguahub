import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getAllSpecializations: (limit?: number, page?: number) =>
    `/specializations?limit=${limit}&page=${page}`,
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
  useAllSpecializations: (limit?: number, page?: number) => {
    return useSWR(url.getAllSpecializations(limit, page), http.fetcher);
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
