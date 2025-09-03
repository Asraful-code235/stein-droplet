'use client';

import { HydrationBoundary, DehydratedState } from '@tanstack/react-query';

interface HydratedPageProps {
  dehydratedState: DehydratedState;
  children: React.ReactNode;
}

export default function HydratedPage({ dehydratedState, children }: HydratedPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      {children}
    </HydrationBoundary>
  );
}
