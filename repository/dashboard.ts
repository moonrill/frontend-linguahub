import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  translatorDashboard: () => '/dashboard/translator',
};

const hooks = {
  useGetTranslatorDashboard: () => {
    return useSWR(url.translatorDashboard(), http.fetcher);
  },
};

export const dashboardRepository = {
  url,
  hooks,
};
