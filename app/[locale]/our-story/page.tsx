import React from "react";
import { getTranslation } from "@/lib/i18n-server";
import OurStoryClient from "@/components/story/OurStoryClient";

export default async function OurStoryPage({ params }: { params: { locale: string } }) {
  const { t } = getTranslation(params.locale);

  const translations = {
    loading: t('common.loading') || 'Loading...',
    errorLoading: t('common.errorLoading') || 'Error loading data',
    retry: t('common.retry') || 'Retry',
    pageTitle: t('navigation.ourStory') || 'Our Story',
    comingSoon: t('common.comingSoon') || 'Coming soon',
  };

  return <OurStoryClient locale={params.locale} translations={translations} />;
}
