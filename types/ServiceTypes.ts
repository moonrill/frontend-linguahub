import { Language } from './LanguageTypes';

export type Service = {
  id: string; 
  name: string; 
  status: string; 
  pricePerHour: number;
  createdAt: string; 
  updatedAt: string; 
  deletedAt: string | null; 
  sourceLanguage: Language; 
  targetLanguage: Language; 
};
