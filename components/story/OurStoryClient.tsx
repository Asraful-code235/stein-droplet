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
  const { data: storyData, error, isLoading } = useOurStoryData(locale);

  console.log("Our Story Debug Info:", {
    locale,
    storyData,
    error,
    isLoading,
    storyDataType: typeof storyData,
    storyDataKeys: storyData ? Object.keys(storyData) : null,
    hero: storyData?.hero,
    content: storyData?.content,
    showcase: storyData?.showcase
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#CB7856] mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">{translations.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{translations.errorLoading}</p>
          <p className="text-gray-600">Error: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#CB7856] text-white rounded hover:bg-[#B86A4A] transition-colors"
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
        <div className="text-center max-w-2xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story Content Not Available</h2>
          <p className="text-lg text-gray-600 mb-4">No story data available</p>
          <div className="bg-gray-100 p-4 rounded-lg text-left">
            <p className="text-sm text-gray-700 mb-2"><strong>Debug Info:</strong></p>
            <p className="text-sm text-gray-600">Locale: {locale}</p>
            <p className="text-sm text-gray-600">Backend URL: {process.env.NEXT_PUBLIC_BACKEND_URL}</p>
            <p className="text-sm text-gray-600">Expected API: /api/our-story</p>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              This might be because:
            </p>
            <ul className="text-sm text-gray-500 mt-2 text-left list-disc list-inside">
              <li>The Our Story content hasn't been created in Strapi</li>
              <li>The content is not published</li>
              <li>There's a component configuration issue</li>
              <li>The API endpoint is returning an error</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <StoryHero data={storyData?.hero} />
      <StoryContent data={storyData?.content} />
      <CompanyShowcase data={storyData?.showcase} />
    </div>
  );
}


