import LoginForm from '@/components/login-form/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ログイン',
  description: 'ログインページ',
};

export default function LoginPage() {
  return <LoginForm />;
}