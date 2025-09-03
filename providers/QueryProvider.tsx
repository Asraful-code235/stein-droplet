'use client';

import { QueryClient, QueryClientProvider, HydrationBoundary, DehydratedState } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

interface QueryProviderProps {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}

export default function QueryProvider({ children, dehydratedState }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Optimized for server-side hydration
            staleTime: 60 * 1000, // 1 minute - data is fresh for 1 minute
            gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache for 10 minutes
            refetchOnWindowFocus: false, // Don't refetch on window focus (data is prefetched)
            refetchOnMount: false, // Don't refetch on mount (data is hydrated)
            refetchOnReconnect: true, // Still refetch when network reconnects
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
