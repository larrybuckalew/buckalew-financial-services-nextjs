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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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