
export type Event = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  poster: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  coupons: any[];
};
