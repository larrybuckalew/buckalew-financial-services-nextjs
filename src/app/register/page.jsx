import { generatePageMetadata } from '@/lib/seo';
import RegisterForm from '@/components/auth/RegisterForm';
import { AuthProvider } from '@/context/AuthContext';
export const metadata = generatePageMetadata({
    title: 'Register',
    description: 'Create a new Buckalew Financial Services account',
    keywords: ['register', 'sign up', 'new account'],
    path: '/register'
});
export default function RegisterPage() {
    return (<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">
          Create an Account
        </h1>
        <AuthProvider>
          <RegisterForm />
        </AuthProvider>
      </div>
    </div>);
}
