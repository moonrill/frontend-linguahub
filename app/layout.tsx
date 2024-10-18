import { config } from '#/config/app';
import 'antd/dist/reset.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { Provider } from './provider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    template: '%s - Linguahub',
    default: 'Linguahub',
  },
  description: 'Linguahub, the best translation language platform',
};

declare global {
  interface Window {
    snap: any;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      {/* ugh */}
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={inter.className}>
        <Script
          src={config.midtransSnapUrl}
          strategy={'beforeInteractive'}
          data-client-key={config.midtransClientKey}
        ></Script>
        <NextTopLoader
          color='#2563eb'
          showSpinner={false}
          shadow='0 0 10px #2563eb,0 0 5px #2563eb'
        />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
