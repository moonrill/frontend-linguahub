'use client';

import { config } from '#/config/app';
import { authRepository } from '#/repository/auth';
import React, { useEffect } from 'react';

export const metadata = {
  title: 'Create Service Request',
};

const CreateServiceRequestLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = authRepository.hooks.useProfile();
  const user = data?.data;

  useEffect(() => {
    if (user) {
      if (!user?.googleCalendarToken) {
        const redirectUrl = new URL(window.location.href);
        window.location.href = `${
          config.baseUrl
        }/auth/google?email=${encodeURIComponent(
          user.email
        )}&redirectUrl=${encodeURIComponent(redirectUrl.href)}`;
      }
    }
  }, [user]);

  return <>{children}</>;
};

export default CreateServiceRequestLayout;
