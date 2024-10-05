export type BaseFormData = {
  role: 'client' | 'translator';
  fullName: string;
  email: string;
  gender: 'male' | 'female';
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  phoneNumber: string;
  province: string;
  city: string;
  district: string;
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
  cv?: File;
  certificate?: File;
};

export type RegisterFormData = ClientFormData | TranslatorFormData;
