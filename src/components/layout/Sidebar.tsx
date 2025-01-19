import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Financial Tools', href: '/dashboard/tools' },
  { name: 'Profile', href: '/dashboard/profile' },
  { name: 'Notifications', href: '/dashboard/notifications' },
  { name: 'Settings', href: '/dashboard/settings' }
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="w-64 bg-white shadow-lg">
      <nav className="mt-5 px-2">
        {navigation.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}