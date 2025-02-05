import { DashboardOverview } from "@/components/dashboard/overview"
import { Card } from "@/components/ui/card"
import { MortgageCalculator } from "@/components/calculators/MortgageCalculator"

export default function DashboardPage() {
 return (
   <div className="space-y-6">
     <div className="flex justify-between items-center">
       <h2 className="text-3xl font-bold">Dashboard</h2>
     </div>
     
     <DashboardOverview />
     
     <div className="grid gap-6 md:grid-cols-2">
       <Card className="p-6">
         <h3 className="text-xl font-semibold mb-4">Quick Calculator</h3>
         <MortgageCalculator />
       </Card>
       <Card className="p-6">
         <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
         <div className="space-y-4">
           {[1,2,3].map((item) => (
             <div key={item} className="flex justify-between items-center border-b pb-2">
               <div>Activity Item {item}</div>
               <div className="text-gray-500">2 hours ago</div>
             </div>
           ))}
         </div>
       </Card>
     </div>
   </div>
 )
}
