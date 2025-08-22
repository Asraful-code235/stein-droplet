"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

interface StoryHeroProps {
  data?: {
    title?: string;
    subTitle?: string;
    description?: string;
    backgroundImage?: string;
    backgroundImageAlt?: string;
  };
}

const StoryHero: React.FC<StoryHeroProps> = ({ data }) => {
  const { t } = useTranslation();

  // Fallback data for when backend is not ready
  const fallbackData = {
    title: t('story.craftingSpacesWith'),
    subTitle: t('story.premiumMaterials'),
    description: t('story.heroDescription'),
    backgroundImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    backgroundImageAlt: "Premium materials showcase"
  };

  const heroData = data || fallbackData;

  return (
    <section className="relative w-full h-screen max-w-none overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroData.backgroundImage || ""}
          alt={heroData.backgroundImageAlt || "Our Story"}
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 -z-5"></div>

      {/* Centered Content */}
      <div className="flex items-center justify-center h-full px-6">
        <div className="text-center text-white max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair leading-tight">
            {heroData.title}
            <span className="text-[#CB7856] font-inter ml-2 block md:inline">
              {heroData.subTitle}
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-xl lg:text-2xl font-sans leading-relaxed max-w-3xl mx-auto">
            {heroData.description}
          </p>
          
          {/* Decorative element */}
          <div className="mt-12 flex justify-center">
            <div className="w-24 h-1 bg-[#CB7856] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm font-sans mb-2">{t('common.scrollToExplore')}</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryHero;
