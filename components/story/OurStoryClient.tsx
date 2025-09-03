'use client';

import React from 'react';
import { useOurStoryData } from '@/hooks/useApi';
import StoryHero from '@/components/story/StoryHero';
import StoryContent from '@/components/story/StoryContent';
import CompanyShowcase from '@/components/story/CompanyShowcase';

interface OurStoryClientProps {
  locale: string;
  translations: {
    loading: string;
    errorLoading: string;
    retry: string;
    pageTitle: string;
    comingSoon: string;
  };
}

export default function OurStoryClient({ locale, translations }: OurStoryClientProps) {
  const { data: storyData, error } = useOurStoryData(locale);

  if (error) {
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

  if (!storyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{translations.pageTitle}</h1>
          <p className="text-gray-600">{translations.comingSoon}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <StoryHero data={storyData.hero} />
      <StoryContent data={storyData.content} />
      <CompanyShowcase data={storyData.showcase} />
    </div>
  );
}


