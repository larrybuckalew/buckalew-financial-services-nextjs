import LoginForm from '@/components/auth/LoginForm';
import Head from 'next/head';

export default function Login() {
  return (
    <>
      <Head>
        <title>Login - Buckalew Financial Services</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </>
  );
}