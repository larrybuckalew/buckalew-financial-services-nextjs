import RegisterForm from '@/components/auth/RegisterForm';
import Head from 'next/head';

export default function Register() {
  return (
    <>
      <Head>
        <title>Register - Buckalew Financial Services</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <RegisterForm />
      </div>
    </>
  );
}