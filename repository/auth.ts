import { http } from '#/utils/http';

const url = {
  login: () => '/auth/login',
};

const manipulateData = {
  login: (data: any) => {
    return http.post(url.login()).send(data);
  },
};

export const authRepository = {
  url,
  manipulateData,
};
