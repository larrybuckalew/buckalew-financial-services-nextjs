import { MortgageCalculator } from "@/components/calculators/MortgageCalculator"
import { RetirementCalculator } from "@/components/calculators/RetirementCalculator"
import { Card } from "@/components/ui/card"

export default function CalculatorsPage() {
 return (
   <div className="space-y-6">
     <h2 className="text-3xl font-bold">Financial Calculators</h2>
     
     <Card className="p-6">
       <h3 className="text-xl font-semibold mb-4">Mortgage Calculator</h3>
       <MortgageCalculator />
     </Card>
     
     <Card className="p-6">
       <h3 className="text-xl font-semibold mb-4">Retirement Calculator</h3>
       <RetirementCalculator />
     </Card>
   </div>
 )
}
