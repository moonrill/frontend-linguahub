import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getPayments: (
    role: string,
    status: string | undefined,
    page: number,
    limit: number,
    type?: string,
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
    if (type) {
      params.append('type', type);
    }
    if (sortBy) {
      params.append('sortBy', sortBy);
    }
    if (order) {
      params.append('order', order);
    }

    const queryString = params.toString();
    let url;

    switch (role) {
      case 'translator':
        url = `/translators/payments${queryString ? `?${queryString}` : ''}`;
        break;
      case 'user':
        url = `/users/payments${queryString ? `?${queryString}` : ''}`;
        break;
      default:
        url = `/payments${queryString ? `?${queryString}` : ''}`;
    }

    return url;
  },
  updateProof: (id: string) => `/payments/${id}/proof`,
  removeProof: (id: string) => `/payments/${id}/proof`,
  completePayment: (id: string) => `/payments/${id}/complete`,
  export: () => `/payments/export`,
};

const hooks = {
  useGetPayments: (
    role: string,
    status: string | undefined,
    page: number,
    limit: number,
    type?: string,
    sortBy?: string,
    order?: string
  ) => {
    return useSWR(
      url.getPayments(role, status, page, limit, type, sortBy, order),
      http.fetcher
    );
  },
};

const api = {
  updateProof: (id: string, data: any) => {
    return http.put(url.updateProof(id)).send(data);
  },
  removeProof: (id: string) => {
    return http.del(url.removeProof(id));
  },
  completePayment: (id: string) => {
    return http.put(url.completePayment(id));
  },
  export: (data: any) => http.post(url.export()).send(data),
};

export const paymentRepository = {
  url,
  api,
  hooks,
};
