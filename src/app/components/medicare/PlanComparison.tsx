interface Plan {
  id: string;
  name: string;
  type: 'Advantage' | 'Supplement' | 'Part D';
  features: string[];
  premium: number;
  deductible: number;
  outOfPocket: number;
}

export function PlanComparison() {
  const plans: Plan[] = [
    {
      id: '1',
      name: 'Premium Advantage Plan',
      type: 'Advantage',
      features: ['Medical', 'Prescription', 'Dental', 'Vision'],
      premium: 0,
      deductible: 0,
      outOfPocket: 3400
    },
    {
      id: '2',
      name: 'Plan G',
      type: 'Supplement',
      features: ['Part A Deductible', 'Part B Excess', 'Foreign Travel'],
      premium: 150,
      deductible: 233,
      outOfPocket: 0
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{plan.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {plan.type}
                </span>
              </td>
              <td className="px-6 py-4">
                <ul className="text-sm text-gray-900">
                  {plan.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${plan.premium}/month</div>
                <div className="text-sm text-gray-500">
                  {plan.deductible > 0 ? `$${plan.deductible} deductible` : 'No deductible'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href={`/medicare/${plan.type.toLowerCase()}/${plan.id}`} className="text-blue-600 hover:text-blue-900">
                  Learn More
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}