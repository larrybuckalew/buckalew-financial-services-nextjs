<<<<<<< HEAD
import { ThemeProvider } from '@/context/ThemeContext'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MainNav } from '@/components/navigation/MainNav'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Buckalew Financial Services',
  description: 'Expert insurance solutions and guidance',
  openGraph: {
    type: 'website',
    title: 'Buckalew Financial Services',
    description: 'Expert insurance solutions and guidance',
    siteName: 'Buckalew Financial Services',
    url: 'https://buckalewfinancialservices.com',
  },
=======
import { ErrorBoundary } from "@/components/error/error-boundary"
import { AuthProvider } from "@/components/providers/auth-provider"
import { Navbar } from '@/components/Navbar'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Buckalew Financial Services',
    template: '%s | Buckalew Financial Services',
  },
  description: 'Expert financial services including life insurance, health insurance, and Medicare solutions.',
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
<<<<<<< HEAD
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <MainNav />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
=======
        <ErrorBoundary>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
