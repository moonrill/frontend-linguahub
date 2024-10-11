export type User = {
  id: string;
  translatorId?: string;
  fullName?: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
  accessToken: string;
};
