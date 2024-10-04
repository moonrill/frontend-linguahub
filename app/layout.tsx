import 'antd/dist/reset.css';
import { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Provider } from './provider';

export const metadata: Metadata = {
  title: {
    template: '%s - Linguahub',
    default: 'Linguahub',
  },
  description: 'Linguahub, the best translation language platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ugh */}
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        <Script src="/api/env" strategy={'beforeInteractive'}></Script>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
