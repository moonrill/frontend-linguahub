export type Payload = {
  id: string;
  translatorId?: string;
  fullName?: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
  accessToken: string;
  profilePicture?: string;
};

export type User = {
  id: string;
  email: string;
  salt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userDetail: UserDetail;
};

export type UserDetail = {
  id: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  profilePicture: string | null;
  province: string;
  city: string;
  district: string;
  subDistrict: string;
  street: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
