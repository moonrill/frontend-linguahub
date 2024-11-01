import { http } from '#/utils/http';

const url = {
  cv: () => '/translators/upload/cv',
  certificate: () => '/translators/upload/certificate',
  uploadFlag: () => `/languages/upload/flagImage`,
  uploadLogo: () => `/specializations/upload/logo`,
};

const api = {
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
  useUploadFlag(flagImage: any) {
    const formData = new FormData();
    formData.append('flagImage', flagImage);

    return http.post(url.uploadFlag()).send(formData);
  },
  useUploadLogo(logo: any) {
    const formData = new FormData();
    formData.append('logo', logo);

    return http.post(url.uploadLogo()).send(formData);
  },
};

export const uploadRepository = {
  url,
  api,
};
