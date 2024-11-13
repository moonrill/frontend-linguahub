import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: `Profile`,
};

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ProfileLayout;
