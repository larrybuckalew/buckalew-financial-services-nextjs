'use client';

interface LoadingStateProps {
  message?: string;
  type?: 'card' | 'table' | 'list';
  count?: number;
}

export function LoadingState({
  message = 'Loading...',
  type = 'card',
  count = 3
}: LoadingStateProps) {
  const renderCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-3">
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-3 text-right">
          <div className="h-6 w-24 bg-gray-200 rounded ml-auto"></div>
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  const renderTableSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-8 w-1/4 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex space-x-4">
            <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div role="alert" aria-busy="true" className="w-full">
      <p className="sr-only">{message}</p>
      <div className="space-y-6">
        {type === 'card' && Array.from({ length: count }).map((_, i) => (
          <div key={i}>{renderCardSkeleton()}</div>
        ))}
        {type === 'table' && renderTableSkeleton()}
        {type === 'list' && renderListSkeleton()}
      </div>
    </div>
  );
}