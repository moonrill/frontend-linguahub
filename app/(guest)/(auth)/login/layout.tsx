import { Metadata } from 'next';
import Login from './page';

export const metadata: Metadata = {
  title: 'Login',
};

const LoginLayout = () => {
  return <Login />;
};

export default LoginLayout;
