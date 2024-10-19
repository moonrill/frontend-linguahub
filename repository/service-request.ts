import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getTranslatorNewServiceRequest: () => `/translators/service-requests`,
  getUserServiceRequest: (
    status: string | undefined,
    page: number,
    limit: number,
    sortBy?: string,
    order?: string
  ) => {
    const params = new URLSearchParams();

    if (status) {
      params.append('status', status);
    }
    if (page) {
      params.append('page', page.toString());
    }
    if (limit) {
      params.append('limit', limit.toString());
    }
    if (sortBy) {
      params.append('sortBy', sortBy);
    }
    if (order) {
      params.append('order', order);
    }

    const queryString = params.toString();
    const url = `/users/service-requests${
      queryString ? `?${queryString}` : ''
    }`;

    return url;
  },
  getServiceRequestById: (id: string) => {
    return `/service-requests/${id}`;
  },
};

const hooks = {
  useTranslatorNewServiceRequest: () => {
    return useSWR(url.getTranslatorNewServiceRequest(), http.fetcher);
  },
  useUserServiceRequest: (
    status: string | undefined,
    page: number,
    limit: number,
    sortBy?: string,
    order?: string
  ) => {
    return useSWR(
      url.getUserServiceRequest(status, page, limit, sortBy, order),
      http.fetcher
    );
  },
  useGetServiceRequestById: (id: string) => {
    return useSWR(url.getServiceRequestById(id), http.fetcher);
  },
};

export const serviceRequestRepository = {
  url,
  hooks,
};
