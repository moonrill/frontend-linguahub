import { config } from '#/config/app';

export const imgLanguage = (flagImage: string) =>
  `${config.baseUrl}/images/flag/${flagImage}`;

export const imgSpecialization = (logo: string) =>
  `${config.baseUrl}/images/specialization/${logo}`;

export const eventPoster = (image: string) =>
  `${config.baseUrl}/images/poster/${image}`;

export const imgProfilePicture = (image: string) =>
  `${config.baseUrl}/images/profile-picture/${image}`;

export const statusColor = {
  request: {
    pending: 'yellow',
    approved: 'green',
    rejected: 'red',
    cancelled: 'red',
  },
  booking: {
    unpaid: 'yellow',
    in_progress: 'blue',
    completed: 'green',
    cancelled: 'red',
  },
  payment: {
    pending: 'yellow',
    paid: 'green',
    failed: 'red',
    refund: 'purple',
  },
};
