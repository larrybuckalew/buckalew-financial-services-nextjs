import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Buckalew Financial Services | Insurance & Financial Planning',
  description: 'Professional insurance and financial planning services. Life, health, Medicare insurance and retirement planning. Get your free quote today!',
  viewport: 'width=device-width, initial-scale=1',
  keywords: ['insurance', 'life insurance', 'health insurance', 'Medicare', 'financial planning', 'retirement'],
  authors: [{ name: 'Buckalew Financial Services' }],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}