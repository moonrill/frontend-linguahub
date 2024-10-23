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

export const specializationRepository = {
  url,
  hooks,
};
