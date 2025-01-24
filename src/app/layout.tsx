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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
