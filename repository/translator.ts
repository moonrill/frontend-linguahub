import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getBestTranslator: () => '/translators/best',
};

const hooks = {
  useGetBestTranslator: () => {
    return useSWR(url.getBestTranslator(), http.fetcher);
  },
};

export const translatorRepository = {
  url,
  hooks,
};
