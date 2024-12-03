import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'My Coupons',
};

const CouponLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default CouponLayout;
