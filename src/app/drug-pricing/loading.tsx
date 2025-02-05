import { TableSkeleton } from '@/components/loading/TableSkeleton';

export default function DrugPricingLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-10 bg-gray-200/50 rounded-lg w-2/3 mx-auto mb-6 animate-pulse" />
            <div className="h-4 bg-gray-200/50 rounded w-full mb-2 animate-pulse" />
            <div className="h-12 bg-gray-200/50 rounded-lg w-48 mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Search Form Skeleton */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          {/* Form Fields */}
          <div className="space-y-6">
            {['Drug Name', 'Dosage', 'Quantity'].map((label, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                <div className="h-10 bg-gray-100 rounded-lg w-full animate-pulse" />
              </div>
            ))}
            <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Results Skeleton */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
          <TableSkeleton rows={5} cols={4} />
        </div>
      </section>
    </div>
  );
}