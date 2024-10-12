import { config } from '#/config/app';

export const imgLanguage = (flagImage: string) =>
  `${config.baseUrl}/images/flag/${flagImage}`;

export const imgSpecialization = (logo: string) =>
  `${config.baseUrl}/images/specialization/${logo}`;
