export type Province = {
  id: string;
  name: string;
};

export type City = {
  id: string;
  province_id: string;
  name: string;
};

export type District = {
  id: string;
  regency_id: string;
  name: string;
};

export type SubDistrict = {
  id: string;
  district_id: string;
  name: string;
};

export type Addresses = {
  province: Province[];
  city: City[];
  district: District[];
  subDistrict: SubDistrict[];
};

export type SelectedAddressId = {
  provinceId?: string;
  cityId?: string;
  districtId?: string;
  subDistrictId?: string;
};

export type SelectedAddressName = {
  province?: string;
  city?: string;
  district?: string;
  subDistrict?: string;
};
