import { City, District, Province, SubDistrict } from '#/types/AddressTypes';

export const fetchAddress = async (
  type: string,
  parentId?: string
): Promise<Province[] | City[] | District[] | SubDistrict[]> => {
  const endpoint = parentId
    ? `https://www.emsifa.com/api-wilayah-indonesia/api/${type}/${parentId}.json`
    : 'https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json';

  try {
    const response = await fetch(endpoint);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return [];
  }
};
