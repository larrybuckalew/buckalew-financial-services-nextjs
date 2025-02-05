import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>
        <div className="space-x-4">
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Go Home
          </Link>
          <Link 
            href="/login"
            className="inline-block bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}