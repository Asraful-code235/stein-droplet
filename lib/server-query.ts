import { QueryClient, dehydrate } from '@tanstack/react-query';
import {
  getAllCategories,
  getAllProducts,
  getProductById,
  getProductsByCategorySlug,
  getAllProjects,
  getProjectByCategoryTitle,
  getAllCatalogues,
  getCatalogueBySlug,
  getOurStoryData,
  projectShowcaseData,
  getHeroData,
  getDiscoveryData,
  getCatalogueHeadingData,
  getAllThickness,
  getCollectionData,
  getAllColors,
  getAllSizes,
} from '@/lib/api';

// Create a server-side QueryClient
export function createServerQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        gcTime: 10 * 60 * 1000, // 10 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
      },
    },
  });
}

// Homepage prefetch function
export async function prefetchHomepageData(locale: string) {
  const queryClient = createServerQueryClient();

  // Prefetch all homepage data in parallel
  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ['hero', locale],
      queryFn: () => getHeroData(locale),
    }),
    queryClient.prefetchQuery({
      queryKey: ['categories', locale],
      queryFn: () => getAllCategories(locale),
    }),
    queryClient.prefetchQuery({
      queryKey: ['discovery', locale],
      queryFn: () => getDiscoveryData(locale),
    }),
    queryClient.prefetchQuery({
      queryKey: ['project', 'showcase', locale],
      queryFn: () => projectShowcaseData(locale),
    }),
    queryClient.prefetchQuery({
      queryKey: ['catalogues', locale],
      queryFn: () => getAllCatalogues(locale),
    }),
    queryClient.prefetchQuery({
      queryKey: ['projects', locale],
      queryFn: () => getAllProjects({ locale }),
    }),
    queryClient.prefetchQuery({
      queryKey: ['collection', locale],
      queryFn: () => getCollectionData({ locale }),
    }),
  ]);

  return dehydrate(queryClient);
}

// Products page prefetch function
export async function prefetchProductsData(locale: string, category?: string) {
  const queryClient = createServerQueryClient();

  // Prefetch products data
  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ['categories', locale],
      queryFn: () => getAllCategories(locale),
    }),
    queryClient.prefetchQuery({
      queryKey: ['products', locale],
      queryFn: () => getAllProducts({ locale }),
    }),
    queryClient.prefetchQuery({
      queryKey: ['colors', locale],
      queryFn: () => getAllColors({ locale }),
    }),
    queryClient.prefetchQuery({
      queryKey: ['thickness', locale],
      queryFn: () => getAllThickness({ locale }),
    }),
    queryClient.prefetchQuery({
      queryKey: ['sizes', locale],
      queryFn: () => getAllSizes({ locale }),
    }),
    // If category is specified, prefetch category-specific products
    ...(category ? [
      queryClient.prefetchQuery({
        queryKey: ['products', 'category', locale, category],
        queryFn: () => getProductsByCategorySlug({ locale, categorySlug: category }),
      })
    ] : []),
  ]);

  return dehydrate(queryClient);
}

// Projects page prefetch function
export async function prefetchProjectsData(locale: string, category?: string) {
  const queryClient = createServerQueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ['projects', locale],
      queryFn: () => getAllProjects({ locale }),
    }),
    queryClient.prefetchQuery({
      queryKey: ['project', 'showcase', locale],
      queryFn: () => projectShowcaseData(locale),
    }),
    queryClient.prefetchQuery({
      queryKey: ['categories', locale],
      queryFn: () => getAllCategories(locale),
    }),
    // If category is specified, prefetch category-specific project
    ...(category ? [
      queryClient.prefetchQuery({
        queryKey: ['projects', 'category', locale, category],
        queryFn: () => getProjectByCategoryTitle({ locale, categoryTitle: category }),
      })
    ] : []),
  ]);

  return dehydrate(queryClient);
}

// Our Story page prefetch function
export async function prefetchOurStoryData(locale: string) {
  const queryClient = createServerQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['our-story', locale],
    queryFn: () => getOurStoryData({ locale }),
    staleTime: 0,
    gcTime: 0,
  });

  return dehydrate(queryClient);
}

// Product detail page prefetch function
export async function prefetchProductDetailData(locale: string, id: string) {
  const queryClient = createServerQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['product', locale, id],
    queryFn: () => getProductById({ locale, id }),
  });

  return dehydrate(queryClient);
}

// Catalogue page prefetch function
export async function prefetchCatalogueData(locale: string, slug?: string) {
  const queryClient = createServerQueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ['catalogues', locale],
      queryFn: () => getAllCatalogues(locale),
      staleTime: 0,
    }),
    queryClient.prefetchQuery({
      queryKey: ['catalogue', 'heading', locale],
      queryFn: () => getCatalogueHeadingData({ locale }),
      staleTime: 0,
    }),
    // If slug is specified, prefetch specific catalogue
    ...(slug ? [
      queryClient.prefetchQuery({
        queryKey: ['catalogue', 'category', locale, slug],
        queryFn: () => getCatalogueBySlug({ locale, category: slug }),
        staleTime: 0,
      })
    ] : []),
  ]);

  return dehydrate(queryClient);
}
