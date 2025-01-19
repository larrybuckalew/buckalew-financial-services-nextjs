interface OverviewCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

export default function OverviewCard({ title, value, change, icon }: OverviewCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 transition-colors duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold mt-2 dark:text-white">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </p>
          )}
        </div>
        {icon && <div className="text-gray-400 dark:text-gray-500">{icon}</div>}
      </div>
    </div>
  );
}