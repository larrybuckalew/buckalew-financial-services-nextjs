"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/lib/store/user-store"
import { Card } from "@/components/ui/card"

const navItems = [
 { label: "Overview", href: "/dashboard" },
 { label: "Calculators", href: "/dashboard/calculators" },
 { label: "Insurance", href: "/dashboard/insurance" },
 { label: "Settings", href: "/dashboard/settings" }
]

export function DashboardNav() {
 const router = useRouter()
 const { settings } = useUserStore()

 return (
   <Card className="p-4">
     <nav className="space-y-2">
       {navItems.map((item) => (
         <Link
           key={item.href}
           href={item.href}
           className="flex items-center rounded-lg px-3 py-2 hover:bg-gray-100"
         >
           {item.label}
         </Link>
       ))}
     </nav>
     
     <div className="mt-4 pt-4 border-t">
       <div className="text-sm text-gray-500">
         <div>Theme: {settings.theme}</div>
         <div>Currency: {settings.currency}</div>
       </div>
     </div>
   </Card>
 )
}
