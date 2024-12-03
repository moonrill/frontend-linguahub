import { Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ClientSuccess = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5); // Mulai dari 5 detik

  useEffect(() => {
    // Interval untuk mengurangi hitungan setiap detik
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // SetTimeout untuk redirect setelah 5 detik
    const timer = setTimeout(() => {
      router.push('/login');
    }, 5000);

    // Bersihkan interval dan timeout saat komponen unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className='m-auto flex flex-col items-center gap-6'>
      <div className='relative w-[300px] h-[300px] ml-6'>
        <Image
          src={'/images/client-success.svg'}
          alt={'client-success'}
          fill
          sizes='(max-width: 400px)'
        />
      </div>
      <h1 className='text-3xl font-semibold'>Success Create Account</h1>
      <p className='text-center w-[500px]'>
        Your account has been successfully created. Please login to your account
        to continue.
      </p>
      <Button
        type='primary'
        onClick={() => router.push('/login')}
        className='text-base font-medium rounded-full py-6 px-14'
      >
        Login
      </Button>
      <p className='text-xs'>
        You will be redirected to the login page in {countdown} seconds
      </p>
    </div>
  );
};

export default ClientSuccess;
