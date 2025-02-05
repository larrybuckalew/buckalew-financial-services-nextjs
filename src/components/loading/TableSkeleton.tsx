export const TableSkeleton = ({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) => (
  <div className="overflow-x-auto">
    <div className="inline-block min-w-full">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex gap-4">
          {Array(cols).fill(0).map((_, i) => (
            <div 
              key={`header-${i}`} 
              className="h-8 bg-gray-200 rounded flex-1 animate-pulse" 
            />
          ))}
        </div>
        {/* Rows */}
        {Array(rows).fill(0).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex gap-4">
            {Array(cols).fill(0).map((_, colIndex) => (
              <div 
                key={`cell-${rowIndex}-${colIndex}`} 
                className="h-6 bg-gray-100 rounded flex-1 animate-pulse" 
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);