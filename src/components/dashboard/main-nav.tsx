"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Calculators", href: "/calculators" },
  { title: "Insurance", href: "/insurance" },
]

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname()
  
  return (
    <nav className={className}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`mx-2 text-sm transition-colors hover:text-blue-600 ${
            pathname?.startsWith(item.href) ? "text-blue-600" : "text-gray-600"
          }`}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
