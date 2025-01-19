interface Goal {
  name: string;
  current: number;
  target: number;
}

export default function GoalsProgress() {
  const goals: Goal[] = [
    { name: 'Emergency Fund', current: 15000, target: 25000 },
    { name: 'Retirement', current: 250000, target: 1000000 },
    { name: 'Home Down Payment', current: 45000, target: 60000 }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Financial Goals</h3>
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <div key={goal.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{goal.name}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>${goal.current.toLocaleString()}</span>
                <span>${goal.target.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}