import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  translatorDashboard: () => '/dashboard/translator',
  adminDashboard: () => '/dashboard/admin',
};

const hooks = {
  useGetTranslatorDashboard: () => {
    return useSWR(url.translatorDashboard(), http.fetcher);
  },
  useGetAdminDashboard: () => {
    return useSWR(url.adminDashboard(), http.fetcher);
  },
};

export const dashboardRepository = {
  url,
  hooks,
};
