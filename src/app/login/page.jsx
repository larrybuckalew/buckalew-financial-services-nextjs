import { SEOUtility } from '@/lib/seo';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = SEOUtility.generatePageSEO({
    title: 'Login',
    description: 'Access your Buckalew Financial Services account',
    keywords: ['login', 'sign in', 'account access'],
    path: '/login'
});

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-primary">
                    Sign In
                </h1>
                <LoginForm />
            </div>
        </div>
    );
}
