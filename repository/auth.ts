import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  login: () => '/auth/login',
  register: () => '/auth/register',
  profile: () => '/auth/profile',
  updateProfile: (id: string) => `/users/${id}`,
  updatePassword: () => '/auth/change-password',
  editTranslatorRegister: () => '/auth/register/edit',
};

const api = {
  login: (data: any) => {
    return http.post(url.login()).send(data);
  },
  register: (data: any) => {
    return http.post(url.register()).send(data);
  },
  updateProfile: (id: string, data: any) => {
    return http.put(url.updateProfile(id)).send(data);
  },
  updatePassword: (data: any) => {
    return http.put(url.updatePassword()).send(data);
  },
  editTranslatorRegister: (data: any) => {
    return http.put(url.editTranslatorRegister()).send(data);
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
  api,
};
