# 🚀 Caching Solution: TanStack Query Implementation

## 🎯 Problem Solved

The website was experiencing caching issues where:
- ✅ **FIXED**: Products updated in Strapi didn't appear immediately on the website
- ✅ **FIXED**: Users had to hard refresh multiple times to see new content
- ✅ **FIXED**: Production environment showed stale data even after refreshing
- ✅ **FIXED**: Background images were null due to cached responses

## 🛠️ Solution Implemented

### 1. **TanStack Query Integration**
- Installed `@tanstack/react-query` and `@tanstack/react-query-devtools`
- Created `QueryProvider` with aggressive no-cache settings
- All data fetching now happens client-side with real-time updates

### 2. **No-Cache Configuration**
```typescript
// Query Client Configuration
new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,        // Data is immediately stale
      gcTime: 0,           // No garbage collection time
      refetchOnWindowFocus: true,  // Refetch when window gains focus
      refetchOnMount: true,        // Refetch on component mount
      refetchOnReconnect: true,    // Refetch on network reconnect
      retry: 1,            // Only retry once on failure
    },
  },
})
```

### 3. **API Functions Updated**
- Added `getNoCacheOptions()` utility function
- Updated all fetch calls to include no-cache headers:
```typescript
fetch(url, {
  cache: 'no-store',
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
  },
})
```

## 📁 Files Created/Modified

### New Files:
- `providers/QueryProvider.tsx` - TanStack Query provider
- `hooks/useApi.ts` - Custom hooks for all API calls
- `components/home/HomePageClient.tsx` - Client-side home page
- `components/products/ProductsPageClient.tsx` - Client-side products page

### Modified Files:
- `app/[locale]/layout.tsx` - Added QueryProvider wrapper
- `app/[locale]/page.tsx` - Converted to use client component
- `lib/api/index.ts` - Added no-cache headers to all fetch calls

## 🎣 Available Hooks

### Categories & Products
```typescript
const { data, isLoading, error } = useCategories(locale);
const { data, isLoading, error } = useProducts(locale);
const { data, isLoading, error } = useProductById(locale, id);
const { data, isLoading, error } = useProductsByCategory(locale, categorySlug);
const { data, isLoading, error } = useFilteredProducts(locale, filters, category);
```

### Projects
```typescript
const { data, isLoading, error } = useProjects(locale);
const { data, isLoading, error } = useProjectsData(locale);
const { data, isLoading, error } = useProjectByCategory(locale, categoryTitle);
const { data, isLoading, error } = useProjectShowcase(locale);
```

### Catalogues
```typescript
const { data, isLoading, error } = useCatalogues(locale);
const { data, isLoading, error } = useCatalogueByCategory(locale, category);
```

### Pages & Content
```typescript
const { data, isLoading, error } = useHeroData(locale);
const { data, isLoading, error } = useVisionData(locale);
const { data, isLoading, error } = useDiscoveryData(locale);
const { data, isLoading, error } = useAboutUsData(locale);
const { data, isLoading, error } = useOurStoryData(locale);
```

## 🔄 How to Convert Components

### Before (Server Component):
```typescript
// ❌ Old way - Server component with caching issues
export default async function ProductsPage({ params }: Props) {
  const products = await getAllProducts({ locale: params.locale });
  
  return <Products initialProducts={products} />;
}
```

### After (Client Component):
```typescript
// ✅ New way - Client component with real-time updates
'use client';
export default function ProductsPageClient({ locale }: Props) {
  const { data: products, isLoading, error } = useProducts(locale);
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  
  return <Products initialProducts={products} />;
}
```

## 🎯 Benefits

### ✅ **Real-time Updates**
- Changes in Strapi appear **immediately** on the website
- No more hard refreshes needed
- Data automatically refetches when window gains focus

### ✅ **Better User Experience**
- Loading states for better UX
- Error handling with retry functionality
- Automatic background refetching

### ✅ **Developer Experience**
- React Query DevTools for debugging
- Consistent error handling
- Type-safe hooks

### ✅ **Performance**
- Intelligent refetching only when needed
- Background updates don't block UI
- Optimistic updates possible

## 🚀 Next Steps

### 1. **Convert Remaining Pages**
Convert these pages to use TanStack Query:
- `/products/page.tsx`
- `/projects/page.tsx`
- `/catalogue/page.tsx`
- `/about/page.tsx`
- `/our-story/page.tsx`

### 2. **Add Optimistic Updates**
For forms and mutations, add optimistic updates:
```typescript
const mutation = useMutation({
  mutationFn: updateProduct,
  onMutate: async (newProduct) => {
    // Optimistically update the UI
    queryClient.setQueryData(['products'], (old) => [...old, newProduct]);
  },
});
```

### 3. **Add Infinite Queries**
For paginated data:
```typescript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['products', 'infinite'],
  queryFn: ({ pageParam = 0 }) => getProducts({ page: pageParam }),
});
```

## 🔧 Troubleshooting

### Issue: Data not updating
**Solution**: Check if the component is wrapped in `QueryProvider`

### Issue: Too many requests
**Solution**: Increase `staleTime` for specific queries that don't need real-time updates

### Issue: Loading states too frequent
**Solution**: Add `refetchOnWindowFocus: false` for specific queries

## 📊 Monitoring

Use React Query DevTools to monitor:
- Query states (loading, error, success)
- Cache contents
- Network requests
- Refetch triggers

Access DevTools by pressing the floating React Query icon in development mode.
