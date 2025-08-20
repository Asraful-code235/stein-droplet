export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen p-8 bg-[#CFBDA0] pt-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <div className="w-full h-[500px] bg-gray-300 rounded animate-pulse"></div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6 bg-[#CB7856] p-6 rounded shadow-md">
          <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse"></div>
          
          {/* Sizes Skeleton */}
          <div>
            <div className="h-6 w-1/3 bg-gray-300 rounded mb-2 animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 w-16 bg-gray-300 rounded animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Pricing Skeleton */}
          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
            ))}
          </div>

          {/* Calculate Section Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}