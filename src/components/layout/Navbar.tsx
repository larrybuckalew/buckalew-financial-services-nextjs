import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Buckalew Financial
        </Link>
        <div className="space-x-4">
          <Link href="/insurance" className="hover:text-blue-200">
            Insurance
          </Link>
          <Link href="/calculators" className="hover:text-blue-200">
            Calculators
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-200">
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="hover:text-blue-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/auth/signin" className="hover:text-blue-200">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}