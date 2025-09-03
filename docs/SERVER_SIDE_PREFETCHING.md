# Server-Side Prefetching with TanStack Query

This project now uses server-side prefetching with TanStack Query hydration for optimal performance.

## How it works

1. **Server-side data fetching**: Pages fetch data on the server during SSR
2. **Query dehydration**: Server data is serialized into a dehydrated state
3. **Client hydration**: TanStack Query hydrates the client with server data
4. **Instant rendering**: No loading states, images start loading immediately

## Benefits

- ✅ **Faster loading**: Images and content load immediately
- ✅ **Better SEO**: Content is server-rendered
- ✅ **Improved Core Web Vitals**: Faster LCP, reduced CLS
- ✅ **No loading states**: Data is available on first render
- ✅ **Automatic caching**: TanStack Query handles client-side caching

## Implementation

### Pages with server-side prefetching

- **Homepage** (`app/[locale]/page.tsx`)
- **Products** (`app/[locale]/products/page.tsx`)
- **Projects** (`app/[locale]/projects/page.tsx`)
- **Our Story** (`app/[locale]/our-story/page.tsx`)

### Key files

- `lib/server-query.ts` - Server-side prefetching utilities
- `components/HydratedPage.tsx` - Hydration boundary wrapper
- `providers/QueryProvider.tsx` - Updated with hydration support

### Usage pattern

```tsx
// Server component (page.tsx)
export default async function Page({ params }: { params: { locale: string } }) {
  // Prefetch data server-side
  const dehydratedState = await prefetchHomepageData(params.locale);

  return (
    <HydratedPage dehydratedState={dehydratedState}>
      <ClientComponent locale={params.locale} />
    </HydratedPage>
  );
}

// Client component
export default function ClientComponent({ locale }: { locale: string }) {
  // Data is immediately available from server prefetch
  const { data } = useApiHook(locale);
  
  // No loading state needed!
  return <div>{data.content}</div>;
}
```

## Performance optimizations

### TanStack Query settings

- `staleTime: 60s` - Data stays fresh for 1 minute
- `gcTime: 10min` - Cache persists for 10 minutes
- `refetchOnMount: false` - No refetch on mount (data is hydrated)
- `refetchOnWindowFocus: false` - No refetch on focus (data is prefetched)

### Image optimizations

- Medium format preference from Strapi
- Appropriate `sizes` attributes
- Lazy loading for non-critical images
- Reduced quality for backgrounds (70-75%)

## Adding new pages

1. Create prefetch function in `lib/server-query.ts`:

```tsx
export async function prefetchMyPageData(locale: string) {
  const queryClient = createServerQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ['my-data', locale],
    queryFn: () => getMyData(locale),
  });
  
  return dehydrate(queryClient);
}
```

2. Update page component:

```tsx
import { prefetchMyPageData } from "@/lib/server-query";
import HydratedPage from "@/components/HydratedPage";

export default async function MyPage({ params }) {
  const dehydratedState = await prefetchMyPageData(params.locale);
  
  return (
    <HydratedPage dehydratedState={dehydratedState}>
      <MyPageClient locale={params.locale} />
    </HydratedPage>
  );
}
```

3. Remove loading states from client component since data is prefetched.

## Monitoring

Use React Query DevTools to monitor:
- Cache status
- Query states
- Hydration success
- Network requests

The DevTools will show that queries are immediately available from the cache after hydration.
