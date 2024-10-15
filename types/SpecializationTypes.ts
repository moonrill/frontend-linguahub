import { Translator } from './TranslatorTypes';

export type Specialization = {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  translators?: Translator[];
};
