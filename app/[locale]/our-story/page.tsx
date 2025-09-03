import React from "react";
import { getTranslation } from "@/lib/i18n-server";
import OurStoryClient from "@/components/story/OurStoryClient";
import { prefetchOurStoryData } from "@/lib/server-query";
import HydratedPage from "@/components/HydratedPage";

export default async function OurStoryPage({ params }: { params: { locale: string } }) {
  const { t } = getTranslation(params.locale);

  // Prefetch our story data server-side
  const dehydratedState = await prefetchOurStoryData(params.locale);

  const translations = {
    loading: t('common.loading') || 'Loading...',
    errorLoading: t('common.errorLoading') || 'Error loading data',
    retry: t('common.retry') || 'Retry',
    pageTitle: t('navigation.ourStory') || 'Our Story',
    comingSoon: t('common.comingSoon') || 'Coming soon',
  };

  return (
    <HydratedPage dehydratedState={dehydratedState}>
      <OurStoryClient locale={params.locale} translations={translations} />
    </HydratedPage>
  );
}
