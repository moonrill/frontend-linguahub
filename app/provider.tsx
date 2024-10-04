'use client';

import { TokenUtil } from '#/utils/token';
import { ConfigProvider } from 'antd';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

TokenUtil.loadToken();
export const Provider = ({ children }: any) => {
  // useEffect(() => {
  //   // @ts-ignore
  //   document.documentElement.style.opacity = 1
  // }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb',
          fontFamily: inter.style.fontFamily,
          fontSize: 16,
          colorLink: '#2563eb',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
