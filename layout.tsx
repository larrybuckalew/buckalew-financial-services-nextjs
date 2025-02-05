import { Inter } from 'next/font/google';
import NavigationWrapper from './components/navigation/NavigationWrapper';
import { Footer } from './components/layout/Footer';  // Add this import
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Buckalew Financial Services',
  description: 'Insurance and financial solutions for your peace of mind.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <NavigationWrapper />
        <main className="min-h-screen">{children}</main>
        <Footer />  {/* Replace the inline footer with this */}
      </body>
    </html>
  );
}