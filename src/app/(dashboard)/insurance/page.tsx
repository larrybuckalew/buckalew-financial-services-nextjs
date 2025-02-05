"use client"

import { Card } from "@/components/ui/card"

const plans = [
 {
   name: "Basic Coverage",
   price: 149,
   features: ["Preventive Care", "Emergency Services", "Prescription Drugs"],
 },
 {
   name: "Premium Coverage",
   price: 299,
   features: ["All Basic Features", "Specialist Visits", "Mental Health", "Vision"],
 },
 {
   name: "Comprehensive",
   price: 449,
   features: ["All Premium Features", "Dental", "Alternative Medicine", "International"],
 },
]

export default function InsurancePage() {
 return (
   <div className="space-y-6">
     <h2 className="text-3xl font-bold">Insurance Plans</h2>
     
     <div className="grid gap-6 md:grid-cols-3">
       {plans.map((plan) => (
         <Card key={plan.name} className="p-6">
           <h3 className="text-xl font-semibold">{plan.name}</h3>
           <div className="mt-2 text-3xl font-bold">${plan.price}</div>
           <p className="text-sm text-gray-500">per month</p>
           
           <ul className="mt-4 space-y-2">
             {plan.features.map((feature) => (
               <li key={feature} className="flex items-center gap-2">
                 <svg 
                   className="w-5 h-5 text-green-500"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor"
                 >
                   <path 
                     strokeLinecap="round" 
                     strokeLinejoin="round" 
                     strokeWidth={2} 
                     d="M5 13l4 4L19 7" 
                   />
                 </svg>
                 {feature}
               </li>
             ))}
           </ul>
           
           <button className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
             Select Plan
           </button>
         </Card>
       ))}
     </div>
   </div>
 )
}
