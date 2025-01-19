import { useTheme } from '@/context/ThemeContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="dark:bg-slate-900 transition-colors duration-200">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 dark:bg-slate-800">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}