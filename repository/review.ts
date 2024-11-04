// review.ts
import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  createReview: (id: string) => `/reviews/${id}`,
  translatorReviews: (
    limit?: number,
    page?: number,
    date?: string,
    translator?: string,
    rating?: string
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
    if (translator) {
      params.append('translator', translator);
    }
    if (rating) {
      params.append('rating', rating.toString());
    }
    const queryString = params.toString();
    return `/translators/reviews${queryString ? `?${queryString}` : ''}`;
  },
};

const hooks = {
  useGetTranslatorReviews: (
    limit?: number,
    page?: number,
    date?: string,
    translator?: string,
    rating?: string
  ) => {
    return useSWR(url.translatorReviews(limit, page, date, translator, rating), http.fetcher);
  },
};

const api = {
  createReview: (bookingId: string, data: any) => {
    return http.post(url.createReview(bookingId)).send(data);
  },
};

export const reviewRepository = {
  url,
  hooks,
  api,
};
