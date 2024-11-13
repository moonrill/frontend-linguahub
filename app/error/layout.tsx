import { Metadata } from 'next';
import React from 'react';
import Layout from '../(guest)/(main)/layout';

export const metadata: Metadata = {
  title: 'Error',
};

const ErrorLayout = ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default ErrorLayout;
