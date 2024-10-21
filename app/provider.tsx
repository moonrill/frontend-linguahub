'use client';

import { TokenUtil } from '#/utils/token';
import { App, ConfigProvider } from 'antd';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  preload: false,
});

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
        components: {
          Input: {
            colorTextPlaceholder: '#a1a1aa',
          },
          DatePicker: {
            colorTextPlaceholder: '#a1a1aa',
          },
          Select: {
            colorTextPlaceholder: '#a1a1aa',
            optionFontSize: 16,
            optionActiveBg: '#d4d4d4',
            optionSelectedBg: '#f4f4f5',
            optionSelectedFontWeight: 500,
          },
          Segmented: {
            itemSelectedBg: '#2563eb',
            itemSelectedColor: '#ffffff',
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
};
