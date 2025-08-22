"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

interface StoryHeroProps {
  data?: {
    title?: string;
    subTitle?: string;
    description?: string;
    backgroundImage?: {
      url?: string;
    };
    backgroundImageAlt?: string;
  };
}

const StoryHero: React.FC<StoryHeroProps> = ({ data }) => {

  const { t } = useTranslation();

  // Fallback data for when backend is not ready
  const fallbackData = {
    title: t("story.craftingSpacesWith"),
    subTitle: t("story.premiumMaterials"),
    description: t("story.heroDescription"),
    backgroundImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    backgroundImageAlt: "Premium materials showcase",
  };

  const heroData = data || fallbackData;

  return (
    <section className="relative w-full min-h-screen max-w-none overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 -z-10">
        {(() => {
          const imageUrl = typeof heroData.backgroundImage === 'object' && heroData.backgroundImage?.url
            ? heroData.backgroundImage.url
            : typeof heroData.backgroundImage === 'string'
            ? heroData.backgroundImage
            : null;

          return imageUrl ? (
            <Image
              src={imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`}
              alt={heroData.backgroundImageAlt || "Our Story"}
              fill
              className="object-cover brightness-30"
              priority
              decoding="async"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
              {/* Animated geometric shapes */}
              <div className="absolute top-20 left-10 w-32 h-32 bg-[#CB7856] opacity-10 rounded-full animate-pulse"></div>
              <div className="absolute top-40 right-20 w-24 h-24 bg-white opacity-5 rounded-lg rotate-45 animate-bounce"></div>
              <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-[#CB7856] opacity-15 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-white opacity-5 rounded-lg rotate-12 animate-bounce delay-500"></div>
            </div>
          );
        })()}
      </div>

      {/* Dynamic overlay with pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 -z-5"></div>

      {/* Geometric overlay pattern */}
      <div
        className="absolute inset-0 opacity-5 -z-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-20">
        <div className="text-center text-white max-w-6xl">
          {/* Animated title with stagger effect */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-playfair leading-tight">
              <span className="inline-block animate-fade-in-up">
                {heroData.title}
              </span>
              <br />
              <span className="text-[#CB7856] font-inter inline-block animate-fade-in-up animation-delay-300 relative">
                {heroData.subTitle}
                {/* Underline decoration */}
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#CB7856] to-transparent animate-expand-width"></div>
              </span>
            </h1>
          </div>

          {/* Description with typewriter effect styling */}
          <div className="animate-fade-in-up animation-delay-600">
            <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl mx-auto text-gray-100">
              {heroData.description}
            </p>
          </div>

          {/* Decorative elements */}
          <div className="mt-16 flex justify-center items-center space-x-4 animate-fade-in-up animation-delay-900">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#CB7856]"></div>
            <div className="w-3 h-3 bg-[#CB7856] rounded-full animate-pulse"></div>
            <div className="w-24 h-px bg-[#CB7856]"></div>
            <div className="w-3 h-3 bg-[#CB7856] rounded-full animate-pulse delay-300"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#CB7856]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryHero;
