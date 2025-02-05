import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

export function AdminSidebar() {
  const router = useRouter()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Clients', href: '/dashboard/clients', icon: '👥' },
    { name: 'Quotes', href: '/dashboard/quotes', icon: '📝' },
    { name: 'Policies', href: '/dashboard/policies', icon: '📄' },
    { name: 'Tasks', href: '/dashboard/tasks', icon: '✓' },
    { name: 'Reports', href: '/dashboard/reports', icon: '📈' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' }
  ]

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full">
        <div className="px-4 py-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={() => signOut()}
            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
          >
            <span className="mr-3">🚪</span>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}