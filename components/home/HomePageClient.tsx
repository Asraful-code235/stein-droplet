'use client';

import React from 'react';
import {
  useCategories,
  useCatalogues,
  useDiscoveryData,
  useHeroData,
  useProjectShowcase,
  useProjects,
  useCollectionData,
} from '@/hooks/useApi';
import Hero from '@/components/home/Banner';
import QuoteSection from '@/components/home/StorySection';
import GallerySection from '@/components/home/ProjectShowcase';
import Vision from '@/components/home/Vision';
import Collections from '@/components/home/Collections';
import ParallaxWrapper from '@/components/parallelWrapper';

interface HomePageClientProps {
  locale: string;
  translations: {
    loading: string;
    errorLoading: string;
    retry: string;
    failedToLoadHero: string;
    failedToLoadDiscovery: string;
  };
}

export default function HomePageClient({ locale, translations }: HomePageClientProps) {
  // Use TanStack Query hooks - data should be available immediately from server prefetch
  const { data: heroData, error: heroError } = useHeroData(locale);
  const { data: categoriesData, error: categoriesError } = useCategories(locale);
  const { data: discoveryData, error: discoveryError } = useDiscoveryData(locale);
  const { data: projectShowcase, error: showcaseError } = useProjectShowcase(locale);
  const { data: catalogueCards, error: catalogueError } = useCatalogues(locale);
  const { data: projects, error: projectsError } = useProjects(locale);
  const { data: collectionData, error: collectionError } = useCollectionData(locale);

  // Show error state (no loading state needed since data is prefetched)
  if (heroError || categoriesError || discoveryError || showcaseError || catalogueError || projectsError || collectionError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg">{translations.errorLoading}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {translations.retry}
          </button>
        </div>
      </div>
    );
  }

  // Show error if required data is missing
  if (!heroData) {
    return <div>{translations.failedToLoadHero}</div>;
  }

  if (!discoveryData?.discoveryContent) {
    return <div>{translations.failedToLoadDiscovery}</div>;
  }

  const { categories, details } = categoriesData || { categories: [], details: null };


  return (
    <ParallaxWrapper>
      <div className="relative">
        {heroData && <Hero data={heroData} locale={locale} />}
        {details?.premiumDetails && (
          <Vision details={details} data={categories} />
        )}
        <QuoteSection discoveryData={discoveryData?.discoveryContent} />
        {projectShowcase && (
          <GallerySection
            data={projectShowcase}
            locale={locale}
            projects={projects || []}
          />
        )}
        {catalogueCards?.collections && (
          <Collections
            collectionCards={catalogueCards.collections}
            data={collectionData}
            locale={locale}
          />
        )}
      </div>
    </ParallaxWrapper>
  );
}
