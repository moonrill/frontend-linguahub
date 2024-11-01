import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getTranslators: (page?: number, limit?: number) =>
    `/translators?page=${page}&limit=${limit}`,
  getBestTranslator: () => '/translators/best',
  searchTranslatorByService: (
    sourceLanguage: string,
    targetLanguage: string,
    sortBy: string,
    page: number,
    limit: number
  ) =>
    `/translators/search/service?sourceLanguage=${sourceLanguage}&targetLanguage=${targetLanguage}&sortBy=${sortBy}&page=${page}&limit=${limit}`,
  getById: (id: string) => `/translators/${id}`,
  translatorLanguages: () => `/translators/languages`,
  updateProfessionalInfo: (id: string) => `/translators/${id}`,
  getRegistrations: (page?: number, limit?: number, status?: string) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    if (status) params.append('status', status);
    const queryString = params.toString();
    return `/translators/registrations?${queryString}`;
  },
  approveTranslator: (id: string) => `/translators/${id}/approve`,
  rejectTranslator: (id: string) => `/translators/${id}/reject`,
  updateBio: (id: string) => `/translators/${id}/bio`,
};

const hooks = {
  useGetTranslators: (page?: number, limit: number = 10) => {
    return useSWR(url.getTranslators(page, limit), http.fetcher);
  },
  useGetBestTranslator: () => {
    return useSWR(url.getBestTranslator(), http.fetcher);
  },
  useSearchTranslatorByService: (
    sourceLanguage: string,
    targetLanguage: string,
    sortBy: string,
    page: number,
    limit: number = 10
  ) => {
    return useSWR(
      url.searchTranslatorByService(
        sourceLanguage,
        targetLanguage,
        sortBy,
        page,
        limit
      ),
      http.fetcher
    );
  },
  useGetTranslatorById: (id: string) => {
    return useSWR(url.getById(id), http.fetcher);
  },
  useGetTranslatorLanguages: () => {
    return useSWR(url.translatorLanguages(), http.fetcher);
  },
  useGetRegistrations: (page?: number, limit?: number, status?: string) => {
    return useSWR(url.getRegistrations(page, limit, status), http.fetcher);
  },
};

const api = {
  updateProfessionalInfo: (id: string, data: any) => {
    return http.put(url.updateProfessionalInfo(id)).send(data);
  },
  approveTranslator: (id: string) => {
    return http.put(url.approveTranslator(id));
  },
  rejectTranslator: (id: string, data: any) => {
    return http.put(url.rejectTranslator(id)).send(data);
  },
  updateBio: (id: string, data: any) => {
    return http.put(url.updateBio(id)).send(data);
  },
};

export const translatorRepository = {
  url,
  api,
  hooks,
};
