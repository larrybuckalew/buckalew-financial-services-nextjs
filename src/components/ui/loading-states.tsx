export function LoadingCalculator() {
 return (
   <div className="animate-pulse space-y-8">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {[1, 2, 3, 4].map((i) => (
         <div key={i} className="space-y-2">
           <div className="h-4 bg-gray-200 rounded w-24"></div>
           <div className="h-10 bg-gray-200 rounded"></div>
         </div>
       ))}
     </div>
     <div className="h-48 bg-gray-200 rounded"></div>
   </div>
 )
}

export function LoadingDashboard() {
 return (
   <div className="animate-pulse space-y-8">
     <div className="h-8 bg-gray-200 rounded w-48"></div>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {[1, 2, 3].map((i) => (
         <div key={i} className="h-32 bg-gray-200 rounded"></div>
       ))}
     </div>
   </div>
 )
}
