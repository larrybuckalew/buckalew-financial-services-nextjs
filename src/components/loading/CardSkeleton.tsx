export const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
    <div className="space-y-2">
      <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
      <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse" />
      <div className="h-4 bg-gray-100 rounded w-4/6 animate-pulse" />
    </div>
  </div>
);

// Grid of cards skeleton
export const CardGridSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array(count).fill(0).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);