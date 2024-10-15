import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getAllSpecializations: (limit?: number, page?: number) =>
    `/specializations?limit=${limit}&page=${page}`,
  getSpecialization: (name: string, limit?: number, page?: number) =>
    `/specializations/${name}?limit=${limit}&page=${page}`,
};

const hooks = {
  useAllSpecializations: (limit?: number, page?: number) => {
    return useSWR(url.getAllSpecializations(limit, page), http.fetcher);
  },
  useSpecialization: (name: string, limit?: number, page?: number) => {
    return useSWR(url.getSpecialization(name, limit, page), http.fetcher);
  },
};

export const specializationRepository = {
  url,
  hooks,
};
