import Link from 'next/link';
import { PageStructure } from '../../../components/layout/PageStructure'; // Import PageStructure
import { SEOUtility } from '@/lib/seo'; // Import SEOUtility
export const metadata = SEOUtility.generatePageSEO({
    title: 'Prescription Drug Pricing Tool | Buckalew Financial Resources',
    description: 'Compare and find the most affordable prescription drug prices. Our comprehensive drug pricing tool helps you save on medication costs.',
    keywords: ['Drug Pricing', 'Prescription Costs', 'Medication Savings', 'Healthcare Resources'],
    path: '/resources/drug-pricing'
});
export default function DrugPricingPage() {
    return (<PageStructure title={metadata.title} description={metadata.description} heroContent={{
            title: 'Prescription Drug Pricing Resources',
            subtitle: 'Compare and find the most affordable prescription drug prices.'
        }}>
      <div className="max-w-4xl mx-auto">
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Helping You Navigate Medication Costs
          </h2>
          <p className="text-gray-700 mb-4">
            Our drug pricing tool helps you compare medication prices, find discounts, 
            and explore cost-effective alternatives to reduce your prescription expenses.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold text-primary mb-2">Key Features</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Comprehensive drug price comparisons</li>
                <li>Access to discount programs</li>
                <li>Generic medication alternatives</li>
                <li>Insurance coverage insights</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold text-primary mb-2">How It Works</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Enter your medication name</li>
                <li>Compare prices across pharmacies</li>
                <li>Find money-saving options</li>
                <li>Get personalized recommendations</li>
              </ul>
            </div>
          </div>
        </section>
        
        <div className="text-center">
          <Link href="/quote" className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors">
            Get Personalized Drug Pricing Assistance
          </Link>
        </div>
      </div>
    </PageStructure>);
}
