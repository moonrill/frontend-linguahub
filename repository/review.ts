import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  createReview: (id: string) => `/reviews/${id}`,
  translatorReviews: (
    limit?: number,
    page?: number,
    date?: string,
    translator?: string
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
    const queryString = params.toString();
    return `/translators/reviews${queryString ? `?${queryString}` : ''}`;
  },
  getAllReviews: (page?: number, limit?: number) =>
    `/services${page ? `?page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`, // Check this endpoint
};

const hooks = {
  useGetTranslatorReviews: (
    limit?: number,
    page?: number,
    date?: string,
    translator?: string
  ) => {
    return useSWR(url.translatorReviews(limit, page, date, translator), http.fetcher);
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
