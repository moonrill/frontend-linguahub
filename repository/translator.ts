import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getTranslators: () => '/translators',
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
};

const hooks = {
  useGetTranslators: () => {
    return useSWR(url.getTranslators(), http.fetcher);
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
};

const api = {
  updateProfessionalInfo: (id: string, data: any) => {
    return http.put(url.updateProfessionalInfo(id)).send(data);
  },
};

export const translatorRepository = {
  url,
  api,
  hooks,
};
