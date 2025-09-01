'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllCategories,
  getAllProducts,
  getProductById,
  getProductsByCategorySlug,
  getAllProjects,
  getProjectsData,
  getProjectByCategoryTitle,
  getAllCatalogues,
  getCatalogueBySlug,
  getAboutUsData,
  getOurStoryData,
  projectShowcaseData,
  getHeroData,
  getVisionData,
  getDiscoveryData,
  getLayoutData,
  getInTouchHeadingData,
  getCatalogueHeadingData,
  getDirectContactData,
  getAllThickness,
  getFilteredProducts,
  getCollectionData,
} from '@/lib/api';

// Categories - rarely change, can cache longer
export const useCategories = (locale: string) => {
  return useQuery({
    queryKey: ['categories', locale],
    queryFn: () => getAllCategories(locale),
    staleTime: 5 * 60 * 1000, // 5 minutes - categories don't change often
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Products - change frequently, shorter cache
export const useProducts = (locale: string) => {
  return useQuery({
    queryKey: ['products', locale],
    queryFn: () => getAllProducts({ locale }),
    staleTime: 1 * 60 * 1000, // 1 minute - products change more often
    gcTime: 3 * 60 * 1000, // 3 minutes
  });
};

export const useProductById = (locale: string, id: string) => {
  return useQuery({
    queryKey: ['product', locale, id],
    queryFn: () => getProductById({ locale, id }),
    staleTime: 2 * 60 * 1000, // 2 minutes - individual products
    gcTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
};

export const useProductsByCategory = (locale: string, categorySlug: string) => {
  return useQuery({
    queryKey: ['products', 'category', locale, categorySlug],
    queryFn: () => getProductsByCategorySlug({ locale, categorySlug }),
    staleTime: 0,
    gcTime: 0,
    enabled: !!categorySlug,
  });
};

export const useFilteredProducts = (locale: string, selectedFilters: any, category: string | null) => {
  return useQuery({
    queryKey: ['products', 'filtered', locale, selectedFilters, category],
    queryFn: () => getFilteredProducts({ locale, selectedFilters, category }),
    staleTime: 0,
    gcTime: 0,
  });
};

// Projects
export const useProjects = (locale: string) => {
  return useQuery({
    queryKey: ['projects', locale],
    queryFn: () => getAllProjects({ locale }),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useProjectsData = (locale: string) => {
  return useQuery({
    queryKey: ['projects', 'data', locale],
    queryFn: () => getProjectsData({ locale }),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useProjectByCategory = (locale: string, categoryTitle: string) => {
  return useQuery({
    queryKey: ['projects', 'category', locale, categoryTitle],
    queryFn: () => getProjectByCategoryTitle({ locale, categoryTitle }),
    staleTime: 0,
    gcTime: 0,
    enabled: !!categoryTitle,
  });
};

export const useProjectShowcase = (locale: string) => {
  return useQuery({
    queryKey: ['project', 'showcase', locale],
    queryFn: () => projectShowcaseData(locale),
    staleTime: 0,
    gcTime: 0,
  });
};

// Catalogues
export const useCatalogues = (locale: string) => {
  return useQuery({
    queryKey: ['catalogues', locale],
    queryFn: () => getAllCatalogues(locale),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useCatalogueByCategory = (locale: string, category: string) => {
  return useQuery({
    queryKey: ['catalogue', 'category', locale, category],
    queryFn: () => getCatalogueBySlug({ locale, category }),
    staleTime: 0,
    gcTime: 0,
    enabled: !!category,
  });
};

// Pages and Content - static content, can cache longer
export const useHeroData = (locale: string) => {
  return useQuery({
    queryKey: ['hero', locale],
    queryFn: () => getHeroData(locale),
    staleTime: 10 * 60 * 1000, // 10 minutes - hero content rarely changes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useVisionData = (locale: string) => {
  return useQuery({
    queryKey: ['vision', locale],
    queryFn: () => getVisionData(locale),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useDiscoveryData = (locale: string) => {
  return useQuery({
    queryKey: ['discovery', locale],
    queryFn: () => getDiscoveryData(locale),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useAboutUsData = (locale: string) => {
  return useQuery({
    queryKey: ['about', locale],
    queryFn: () => getAboutUsData(locale),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useOurStoryData = (locale: string) => {
  return useQuery({
    queryKey: ['our-story', locale],
    queryFn: () => getOurStoryData({ locale }),
    staleTime: 0,
    gcTime: 0,
  });
};

// Layout and Common
export const useLayoutData = (locale: string) => {
  return useQuery({
    queryKey: ['layout', locale],
    queryFn: () => getLayoutData(locale),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useInTouchHeading = (locale: string) => {
  return useQuery({
    queryKey: ['in-touch', 'heading', locale],
    queryFn: () => getInTouchHeadingData({ locale }),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useCatalogueHeading = (locale: string) => {
  return useQuery({
    queryKey: ['catalogue', 'heading', locale],
    queryFn: () => getCatalogueHeadingData({ locale }),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useDirectContactData = (locale: string) => {
  return useQuery({
    queryKey: ['direct-contact', locale],
    queryFn: () => getDirectContactData({ locale }),
    staleTime: 0,
    gcTime: 0,
  });
};

// Filters
export const useThickness = (locale: string) => {
  return useQuery({
    queryKey: ['thickness', locale],
    queryFn: () => getAllThickness({ locale }),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useCollectionData = (locale: string) => {
  return useQuery({
    queryKey: ['collection', locale],
    queryFn: () => getCollectionData({ locale }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Special hook for real-time updates (use when actively editing content)
export const useProductsRealTime = (locale: string) => {
  return useQuery({
    queryKey: ['products', 'realtime', locale],
    queryFn: () => getAllProducts({ locale }),
    staleTime: 0, // Always fresh
    gcTime: 0, // No cache
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useCategoriesRealTime = (locale: string) => {
  return useQuery({
    queryKey: ['categories', 'realtime', locale],
    queryFn: () => getAllCategories(locale),
    staleTime: 0, // Always fresh
    gcTime: 0, // No cache
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

// Manual refresh functions
export const useManualRefresh = () => {
  const queryClient = useQueryClient();

  const refreshProducts = (locale: string) => {
    queryClient.invalidateQueries({ queryKey: ['products', locale] });
    queryClient.invalidateQueries({ queryKey: ['products', 'realtime', locale] });
  };

  const refreshCategories = (locale: string) => {
    queryClient.invalidateQueries({ queryKey: ['categories', locale] });
    queryClient.invalidateQueries({ queryKey: ['categories', 'realtime', locale] });
  };

  const refreshProjects = (locale: string) => {
    queryClient.invalidateQueries({ queryKey: ['projects', locale] });
    queryClient.invalidateQueries({ queryKey: ['project', 'showcase', locale] });
  };

  const refreshAll = (locale: string) => {
    queryClient.invalidateQueries({ queryKey: [locale] }); // Invalidate all queries for this locale
  };

  return {
    refreshProducts,
    refreshCategories,
    refreshProjects,
    refreshAll,
  };
};
