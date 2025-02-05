import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockData = [
  { month: "Jan", balance: 5000, savings: 500, expenses: 3000 },
  { month: "Feb", balance: 6200, savings: 700, expenses: 2800 },
  { month: "Mar", balance: 7800, savings: 800, expenses: 2900 },
  { month: "Apr", balance: 9200, savings: 900, expenses: 2750 },
]

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6">
        <h3 className="text-sm font-medium">Total Balance</h3>
        <div className="mt-2 text-2xl font-bold">$9,200</div>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium">Monthly Savings</h3>
        <div className="mt-2 text-2xl font-bold">$900</div>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium">Monthly Expenses</h3>
        <div className="mt-2 text-2xl font-bold">$2,750</div>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium">Investments</h3>
        <div className="mt-2 text-2xl font-bold">$15,400</div>
      </Card>
      <Card className="col-span-4 p-6">
        <h3 className="text-lg font-medium">Financial Overview</h3>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#2563eb" />
              <Line type="monotone" dataKey="savings" stroke="#16a34a" />
              <Line type="monotone" dataKey="expenses" stroke="#dc2626" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
