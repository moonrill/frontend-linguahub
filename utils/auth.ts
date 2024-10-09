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
  const token = cookies().get('accessToken')?.value;
  if (!token) {
    return null;
  }

  return await decrypt(token);
};
