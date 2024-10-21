import { http } from '#/utils/http';

const url = {
  createReview: (id: string) => `/reviews/${id}`,
};

const manipulateData = {
  createReview: (bookingId: string, data: any) => {
    return http.post(url.createReview(bookingId)).send(data);
  },
};

export const reviewRepository = {
  url,
  manipulateData,
};
