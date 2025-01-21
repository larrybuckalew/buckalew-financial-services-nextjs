import React, { ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

interface LayoutProps {
  children: ReactNode
  title?: string
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Buckalew Financial Services' 
}) => {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen flex flex-col bg-bfs-background">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/bfs-logo.svg" />
        <meta name="description" content="Buckalew Financial Services" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/bfs-logo.svg" 
                  alt="BFS Logo" 
                  width={120} 
                  height={40} 
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="text-bfs-blue hover:text-bfs-green-dark"
              >
                Dashboard
              </Link>
              <Link 
                href="/calculators" 
                className="text-bfs-blue hover:text-bfs-green-dark"
              >
                Calculators
              </Link>
              <Link 
                href="/reports" 
                className="text-bfs-blue hover:text-bfs-green-dark"
              >
                Reports
              </Link>

              {/* Authentication Links */}
              {session ? (
                <div className="flex items-center space-x-4">
                  <span className="text-bfs-blue">
                    {session.user?.name || session.user?.email}
                  </span>
                  <button 
                    onClick={() => signOut()}
                    className="bfs-button"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="bfs-button"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-bfs-blue text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <div>
            <h3 className="text-lg font-montserrat-semibold">
              Buckalew Financial Services
            </h3>
            <p className="text-sm">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-bfs-green-light">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-bfs-green-light">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-bfs-green-light">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout