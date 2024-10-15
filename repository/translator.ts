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
    `/translators/service?sourceLanguage=${sourceLanguage}&targetLanguage=${targetLanguage}&sortBy=${sortBy}&page=${page}&limit=${limit}`,
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
};

export const translatorRepository = {
  url,
  hooks,
};
