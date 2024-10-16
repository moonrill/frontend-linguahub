import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  login: () => '/auth/login',
  register: () => '/auth/register',
  profile: () => '/auth/profile',
};

const manipulateData = {
  login: (data: any) => {
    return http.post(url.login()).send(data);
  },
  register: (data: any) => {
    return http.post(url.register()).send(data);
  },
};

const hooks = {
  useProfile: () => {
    return useSWR(url.profile(), http.fetcher);
  },
};

export const authRepository = {
  url,
  hooks,
  manipulateData,
};
