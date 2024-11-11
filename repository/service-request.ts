import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getServiceRequests: (
    role: string,
    status: string | undefined,
    page: number,
    limit: number,
    sortBy?: string
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

    const queryString = params.toString();
    let url;

    switch (role) {
      case 'translator':
        url = `/translators/service-requests${
          queryString ? `?${queryString}` : ''
        }`;
        break;
      case 'user':
        url = `/users/service-requests${queryString ? `?${queryString}` : ''}`;
        break;
      default:
        url = `/service-requests${queryString ? `?${queryString}` : ''}`;
    }

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
  useGetServiceRequests: (
    role: string,
    status: string | undefined,
    page: number,
    limit: number,
    sortBy?: string
  ) => {
    return useSWR(
      url.getServiceRequests(role, status, page, limit, sortBy),
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
