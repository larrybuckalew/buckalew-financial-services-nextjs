import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricsChartProps {
  data: {
    date: string;
    assets: number;
    savings: number;
    returns: number;
  }[];
}

export default function MetricsChart({ data }: MetricsChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Financial Growth</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="assets" stroke="#2563eb" name="Total Assets" />
            <Line type="monotone" dataKey="savings" stroke="#16a34a" name="Savings" />
            <Line type="monotone" dataKey="returns" stroke="#9333ea" name="Returns" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}