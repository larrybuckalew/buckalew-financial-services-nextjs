import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import InsuranceQuoteCalculator from '@/components/calculators/InsuranceQuoteCalculator';

export default function LifeInsurance() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Life Insurance Solutions</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Term Life Insurance</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Affordable coverage for a specific period, perfect for temporary needs
                and family protection.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  10, 20, or 30-year terms
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Level premiums
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  High coverage amounts
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Get Quote
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Whole Life Insurance</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Permanent coverage with cash value accumulation and fixed premiums.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Lifetime coverage
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Cash value growth
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Fixed premiums
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Get Quote
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Get Your Personalized Quote</h2>
          <InsuranceQuoteCalculator />
        </div>
      </div>
    </Layout>
  );
}