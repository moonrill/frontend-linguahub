import { config } from '#/config/app';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const key = new TextEncoder().encode(config.jwtSecret);

export const decrypt = async (token: string) => {
  const payload = await jwtVerify(token, key, {
    algorithms: ['HS256'],
  });

  return payload;
};

export const getUser = async () => {
  const accessToken = cookies().get('accessToken')?.value;
  if (!accessToken) {
    return null;
  }

  const { payload } = await decrypt(accessToken);
  const result = { ...payload, accessToken };

  return result;
};
