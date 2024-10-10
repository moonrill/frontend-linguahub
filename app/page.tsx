'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router) {
      router.push('/home');
    }
  }, [router]);

  return <div style={{}}></div>;
}
