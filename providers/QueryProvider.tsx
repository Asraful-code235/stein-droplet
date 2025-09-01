'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Keep data fresh but reduce unnecessary refetches
            staleTime: 30 * 1000, // 30 seconds - data is fresh for 30s
            gcTime: 5 * 60 * 1000, // 5 minutes - keep in cache for 5 minutes
            refetchOnWindowFocus: true, // Still refetch when window gains focus
            refetchOnMount: false, // Don't refetch on every mount if data is fresh
            refetchOnReconnect: true, // Refetch when network reconnects
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
