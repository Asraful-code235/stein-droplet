// app/[lang]/page.tsx
import HomePageClient from "@/components/home/HomePageClient";
import { getTranslation } from "@/lib/i18n-server";
import { prefetchHomepageData } from "@/lib/server-query";
import HydratedPage from "@/components/HydratedPage";

export default async function Page({ params }: { params: { locale: string } }) {
  const { t } = getTranslation(params.locale);

  // Prefetch all homepage data server-side
  const dehydratedState = await prefetchHomepageData(params.locale);

  // Convert translation function to object for client component
  const translations = {
    loading: t('common.loading') || 'Loading...',
    errorLoading: t('common.errorLoading') || 'Error loading data',
    retry: t('common.retry') || 'Retry',
    failedToLoadHero: t('common.failedToLoadHero') || 'Failed to load hero content',
    failedToLoadDiscovery: t('common.failedToLoadDiscovery') || 'Failed to load discovery content',
  };

  return (
    <HydratedPage dehydratedState={dehydratedState}>
      <HomePageClient locale={params.locale} translations={translations} />
    </HydratedPage>
  );
}
