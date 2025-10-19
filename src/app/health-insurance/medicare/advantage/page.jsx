import Link from 'next/link';
export const metadata = {
    title: 'Medicare Advantage Plans | Buckalew Financial Services',
    description: 'Comprehensive Medicare Advantage plans that offer additional benefits beyond Original Medicare. Get personalized guidance from Buckalew Financial.',
    keywords: ['Medicare Advantage', 'Medicare Part C', 'Healthcare Coverage', 'Insurance Plans'],
    openGraph: {
        title: 'Medicare Advantage Plans - Buckalew Financial',
        description: 'Discover Medicare Advantage plans with comprehensive coverage and additional benefits.',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};
export default function MedicareAdvantagePage() {
    return (<div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Medicare Advantage (Part C) Plans
        </h1>
        
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            All-in-One Medicare Coverage
          </h2>
          <p className="text-gray-700 mb-4">
            Medicare Advantage plans combine Medicare Part A, Part B, and often Part D 
            benefits into a single, comprehensive health insurance plan with additional 
            benefits not offered by Original Medicare.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold text-primary mb-2">Key Features</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>All Original Medicare benefits</li>
                <li>Often includes prescription drug coverage</li>
                <li>Additional benefits like dental, vision, and hearing</li>
                <li>Annual out-of-pocket maximum</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold text-primary mb-2">Plan Types</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>HMO (Health Maintenance Organization)</li>
                <li>PPO (Preferred Provider Organization)</li>
                <li>Private Fee-for-Service Plans</li>
                <li>Special Needs Plans</li>
              </ul>
            </div>
          </div>
        </section>
        
        <div className="text-center">
          <Link href="/quote" className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors">
            Get a Free Medicare Advantage Quote
          </Link>
        </div>
      </div>
    </div>);
}
