import Link from 'next/link';
export const metadata = {
    title: 'Medicare Supplement Insurance | Buckalew Financial Services',
    description: 'Comprehensive Medicare Supplement (Medigap) insurance solutions to fill gaps in Original Medicare coverage. Get personalized guidance from Buckalew Financial.',
    keywords: ['Medicare Supplement', 'Medigap', 'Medicare Insurance', 'Healthcare Coverage'],
    openGraph: {
        title: 'Medicare Supplement Insurance - Buckalew Financial',
        description: 'Find the right Medicare Supplement plan to protect your healthcare needs.',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};
export default function MedicareSupplementPage() {
    return (<div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Medicare Supplement Insurance (Medigap)
        </h1>
        
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Comprehensive Coverage for Your Healthcare Needs
          </h2>
          <p className="text-gray-700 mb-4">
            Medicare Supplement insurance, also known as Medigap, helps cover the out-of-pocket costs 
            that Original Medicare doesn't pay, such as copayments, coinsurance, and deductibles.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold text-primary mb-2">Key Benefits</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Covers Medicare Part A and B cost-sharing</li>
                <li>Helps reduce out-of-pocket medical expenses</li>
                <li>Nationwide coverage with most providers</li>
                <li>No network restrictions</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold text-primary mb-2">Plan Options</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Plan A through Plan N</li>
                <li>Standardized coverage across providers</li>
                <li>Flexible options to match your needs</li>
              </ul>
            </div>
          </div>
        </section>
        
        <div className="text-center">
          <Link href="/quote" className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors">
            Get a Free Medicare Supplement Quote
          </Link>
        </div>
      </div>
    </div>);
}
