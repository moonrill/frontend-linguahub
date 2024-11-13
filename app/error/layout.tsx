import React from 'react';
import Layout from '../(guest)/(main)/layout';

const ErrorLayout = ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default ErrorLayout;
