import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Service Request',
};

const ServiceRequestLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ServiceRequestLayout;
