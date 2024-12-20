import { Dayjs } from 'dayjs';

export type BaseFormData = {
  role: 'client' | 'translator';
  fullName: string;
  email: string;
  gender: 'male' | 'female';
  password: string;
  confirmPassword: string;
  dateOfBirth: Dayjs;
  phoneNumber: string;
  provinceId: string;
  province: string;
  cityId: string;
  city: string;
  districtId: string;
  district: string;
  subDistrictId: string;
  subDistrict: string;
  street: string;
};

export type ClientFormData = BaseFormData;

export type TranslatorFormData = BaseFormData & {
  yearsOfExperience: number;
  portfolioLink: string;
  bank: string;
  bankAccountNumber: string;
  languages: string[];
  specializations: string[];
  cv: string;
  certificate: string;
};

export type RegisterFormData = ClientFormData | TranslatorFormData;
