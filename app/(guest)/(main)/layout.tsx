'use client';

import Footer from '#/components/Footer/Footer';
import Navbar from '#/components/Navbar/Navbar';
import { useEffect, useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setVisible(visible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      className={`transition-all duration-300 ${visible ? '' : '-mt-[64px]'}`}
    >
      <Navbar visible={visible} />
      <main
        className={` px-[120px] transition-all duration-300 mb-16 ${
          visible ? '' : 'mt-[64px]'
        }`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
