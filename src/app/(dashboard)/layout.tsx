import { DashboardNav } from "@/components/dashboard/nav"

export default function DashboardLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
   <div className="min-h-screen bg-gray-50">
     <div className="grid grid-cols-12 gap-4 p-4">
       <div className="col-span-3">
         <DashboardNav />
       </div>
       <main className="col-span-9">
         {children}
       </main>
     </div>
   </div>
 )
}
