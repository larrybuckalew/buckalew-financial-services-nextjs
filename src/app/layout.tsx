<<<<<<< HEAD
import { ErrorBoundary } from "@/components/error/error-boundary"
import { AuthProvider } from "@/components/providers/auth-provider"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
=======
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
>>>>>>> 9254d4bfdeb18652b924355b7dc411ffd01a30d5

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
<<<<<<< HEAD
        <ErrorBoundary>
          <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
=======
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
>>>>>>> 9254d4bfdeb18652b924355b7dc411ffd01a30d5
