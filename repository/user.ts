import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getAllUsers: (page?: number, limit?: number) => '/users',
};

const hooks = {
  useGetAllUsers: (page?: number, limit: number = 10) => {
    return useSWR(url.getAllUsers(page, limit), http.fetcher);
  },
};

export const userRepository = {
  url,
  hooks,
};
