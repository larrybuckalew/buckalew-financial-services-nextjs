import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
function MyApp({ Component, pageProps }) {
    return (<AuthProvider>
      <ThemeProvider>
        <Component {...pageProps}/>
      </ThemeProvider>
    </AuthProvider>);
}
export default MyApp;
