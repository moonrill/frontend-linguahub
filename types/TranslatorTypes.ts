import { Language } from './LanguageTypes';
import { Specialization } from './SpecializationTypes';
import { User } from './UserType';

export type Translator = {
  id: string;
  status: string;
  bio: string | null;
  rating: number;
  portfolioLink: string;
  yearsOfExperience: number;
  bank: string;
  bankAccountNumber: string;
  cv: string | null;
  certificate: string | null;
  rejectionReason: string | null;
  reviewsCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: User;
};

export type BestTranslator = Translator & {
  languages: Language[];
  specializations: Specialization[];
  completedBookingsCount: number;
  combinedScore: number;
};
