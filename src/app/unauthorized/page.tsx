import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Unauthorized Access',
  description: 'You do not have permission to access this page.',
  keywords: ['unauthorized', 'access denied', 'permission'],
  path: '/unauthorized'
});

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-6xl mb-6">🚫</div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Unauthorized Access
          </h1>
          <p className="text-gray-600 mb-6">
            You do not have permission to access this page. 
            Please ensure you are logged in with the appropriate credentials.
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/login"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition block"
            >
              Login
            </Link>
            
            <Link 
              href="/"
              className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary-light transition block"
            >
              Return to Home
            </Link>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          If you believe this is an error, please contact our support team.
          <p className="mt-2">
            Support: (555) 123-4567 | support@buckalewfinancial.com
          </p>
        </div>
      </div>
    </div>
  );
}
