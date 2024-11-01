import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getTranslatorServiceRequest: (
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
    const url = `/translators/service-requests${
      queryString ? `?${queryString}` : ''
    }`;

    return url;
  },
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
  cancelRequest: (id: string) => {
    return `/service-requests/${id}/cancel`;
  },
  updateServiceRequestStatus: (id: string) => `/service-requests/${id}`,
  approveRequest: (id: string) => `/service-requests/${id}/approve`,
  rejectRequest: (id: string) => `/service-requests/${id}/reject`,
  createServiceRequest: () => `/service-requests`,
};

const hooks = {
  useTranslatorServiceRequest: (
    page: number,
    limit: number,
    sortBy?: string,
    order?: string,
    status?: string
  ) => {
    return useSWR(
      url.getTranslatorServiceRequest(status, page, limit, sortBy, order),
      http.fetcher
    );
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

const api = {
  cancelRequest: (id: string) => {
    return http.put(url.cancelRequest(id));
  },
  updateServiceRequest(id: string, data: any) {
    return http.put(url.updateServiceRequestStatus(id)).send(data);
  },
  approveRequest: (id: string) => {
    return http.put(url.approveRequest(id));
  },
  rejectRequest: (id: string, data: any) => {
    return http.put(url.rejectRequest(id)).send(data);
  },
  createServiceRequest: (data: any) => {
    return http.post(url.createServiceRequest()).send(data);
  },
};

export const serviceRequestRepository = {
  url,
  hooks,
  api,
};
