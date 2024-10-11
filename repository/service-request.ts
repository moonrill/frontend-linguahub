import { http } from '#/utils/http';
import useSWR from 'swr';

const url = {
  getTranslatorNewServiceRequest: () => `/translators/service-requests`,
};

const hook = {
  useTranslatorNewServiceRequest: () => {
    return useSWR(url.getTranslatorNewServiceRequest(), http.fetcher);
  },
};

export const serviceRequestRepository = {
  url,
  hook,
};
