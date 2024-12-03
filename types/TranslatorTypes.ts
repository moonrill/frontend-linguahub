import { Booking } from './BookingTypes';
import { Language } from './LanguageTypes';
import { Service } from './ServiceTypes';
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
  languages?: Language[] | [];
  specializations?: Specialization[] | [];
  lowestServicePrice?: number;
  services?: Service[] | [];
  reviews?: Review[] | [];
};

export type BestTranslator = Translator & {
  languages: Language[];
  specializations: Specialization[];
  completedBookingsCount: number;
  combinedScore: number;
};

export type Review = {
  id: string;
  rating: number;
  comment: string;
  translator?: Translator;
  user?: User;
  booking?: Booking;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
