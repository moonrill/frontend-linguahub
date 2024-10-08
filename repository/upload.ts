import { http } from '#/utils/http';

const url = {
  cv: () => '/translators/upload/cv',
  certificate: () => '/translators/upload/certificate',
};

const manipulateData = {
  useCvUpload(cv: any) {
    const formData = new FormData();
    formData.append('cv', cv);

    return http.post(url.cv()).send(formData);
  },
  useCertificateUpload(certificate: any) {
    const formData = new FormData();
    formData.append('certificate', certificate);

    return http.post(url.certificate()).send(formData);
  },
};

export const uploadRepository = {
  url,
  manipulateData,
};
