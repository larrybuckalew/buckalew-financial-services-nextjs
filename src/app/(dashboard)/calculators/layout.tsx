import { Suspense } from "react"
import { LoadingCalculator } from "@/components/ui/loading-states"

export default function CalculatorLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
   <Suspense fallback={<LoadingCalculator />}>
     {children}
   </Suspense>
 )
}
