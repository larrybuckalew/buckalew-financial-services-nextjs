import { CardGridSkeleton } from '@/components/loading/CardSkeleton';

export default function MedicareLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-10 bg-gray-200/50 rounded-lg w-2/3 mx-auto mb-6 animate-pulse" />
            <div className="h-4 bg-gray-200/50 rounded w-full mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200/50 rounded w-5/6 mx-auto mb-8 animate-pulse" />
            <div className="h-12 bg-gray-200/50 rounded-lg w-48 mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Medicare Options Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-12 animate-pulse" />
          <CardGridSkeleton count={3} />
        </div>
      </section>

      {/* Resources Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-12 animate-pulse" />
          <CardGridSkeleton count={3} />
        </div>
      </section>
    </div>
  );
}