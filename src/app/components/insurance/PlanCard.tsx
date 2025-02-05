interface PlanProps {
  title: string;
  description: string;
  benefits: string[];
  monthlyPremium: number;
  type: 'medicare' | 'health' | 'life';
}

export function PlanCard({ title, description, benefits, monthlyPremium, type }: PlanProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2 mb-4">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            {benefit}
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">${monthlyPremium}/mo</span>
        <a href={`/${type}/${title.toLowerCase().replace(/\s+/g, '-')}`} 
           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Learn More
        </a>
      </div>
    </div>
  )
}