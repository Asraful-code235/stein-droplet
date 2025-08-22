import { getOurStoryData } from "@/lib/api";
import React from "react";
import StoryHero from "@/components/story/StoryHero";
import { getTranslation } from "@/lib/i18n-server";
import StoryContent from "@/components/story/StoryContent";
import CompanyShowcase from "@/components/story/CompanyShowcase";

export default async function OurStoryPage({ params }: { params: { locale: string } }) {
  const { t } = getTranslation(params.locale);
  const storyData = await getOurStoryData({ locale: params.locale });


  if (!storyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('navigation.ourStory')}</h1>
          <p className="text-gray-600">{t('common.comingSoon')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <StoryHero data={storyData.hero} />
      
      {/* Rich Content Section */}
      <StoryContent data={storyData.content} />
      
      {/* Company Showcase Section */}
      <CompanyShowcase data={storyData.showcase} />
    </div>
  );
}
