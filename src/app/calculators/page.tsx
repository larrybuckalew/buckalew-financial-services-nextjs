export default function CalculatorsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Financial Calculators</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a href="/calculators/retirement" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Retirement Calculator</h2>
          <p className="text-gray-600">Plan your retirement savings and estimate future wealth.</p>
        </a>
        <a href="/calculators/mortgage" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Mortgage Calculator</h2>
          <p className="text-gray-600">Calculate monthly payments and total mortgage costs.</p>
        </a>
        <a href="/calculators/investment" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Investment Calculator</h2>
          <p className="text-gray-600">Project investment growth and returns over time.</p>
        </a>
      </div>
    </div>
  );
}