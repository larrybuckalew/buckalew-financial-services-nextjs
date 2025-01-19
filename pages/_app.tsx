import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}