import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  createReview: (id: string) => `/reviews/${id}`,
  translatorReviews: (
    limit?: number,
    page?: number,
    date?: string,
    rating?: number
  ) => {
    const params = new URLSearchParams();
    if (page) {
      params.append('page', page.toString());
    }
    if (limit) {
      params.append('limit', limit.toString());
    }
    if (date) {
      params.append('date', date);
    }
    if (rating) {
      params.append('rating', rating.toString());
    }
    const queryString = params.toString();
    const url = `/translators/reviews${queryString ? `?${queryString}` : ''}`;
    return url;
  },
};

const hooks = {
  useGetTranslatorReviews: (
    limit?: number,
    page?: number,
    date?: string,
    rating?: number
  ) => {
    return useSWR(
      url.translatorReviews(limit, page, date, rating),
      http.fetcher
    );
  },
};

const manipulateData = {
  createReview: (bookingId: string, data: any) => {
    return http.post(url.createReview(bookingId)).send(data);
  },
};

export const reviewRepository = {
  url,
  hooks,
  manipulateData,
};
