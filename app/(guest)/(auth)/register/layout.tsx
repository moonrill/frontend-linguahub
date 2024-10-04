import { Metadata } from 'next';
import Register from './page';

export const metadata: Metadata = {
  title: 'Register',
};

const RegisterLayout = () => {
  return <Register />;
};

export default RegisterLayout;
