import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function HealthInsurance() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Health Insurance Plans</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">ACA Health Plans</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Comprehensive health coverage that meets ACA requirements with various
                levels of coverage to fit your needs.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  No pre-existing condition restrictions
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Preventive care covered 100%
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Prescription drug coverage
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Learn More
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Medicare Plans</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Medicare coverage options including Advantage plans and supplements
                to ensure comprehensive coverage.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Medicare Advantage Plans
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Medicare Supplement Insurance
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Prescription Drug Plans (Part D)
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Learn More
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Short-Term Health Plans</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Temporary coverage solutions for transitions between jobs or other
                gap periods in coverage.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Flexible terms up to 12 months
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Lower premiums
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Quick approval process
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Learn More
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}