import { config } from '#/config/app';

export const imgLanguage = (flagImage: string) =>
  `${config.baseUrl}/images/flag/${flagImage}`;

export const imgSpecialization = (logo: string) =>
  `${config.baseUrl}/images/specialization/${logo}`;

export const eventPoster = (image: string) =>
  `${config.baseUrl}/images/poster/${image}`;

export const imgProfilePicture = (image: string) =>
  `${config.baseUrl}/images/profile/${image}`;
