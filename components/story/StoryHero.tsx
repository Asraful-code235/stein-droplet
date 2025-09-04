"use client";
import React from "react";
import Image from "next/image";

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

  // No fallback content/images: if no backend data provided, render nothing
  if (!data) return null;

  return (
    <section className="relative w-full min-h-screen max-w-none overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 -z-10">
        {(() => {
          const imageUrl = typeof data.backgroundImage === 'object' && data.backgroundImage?.url
            ? data.backgroundImage.url
            : typeof (data as any).backgroundImage === 'string'
            ? (data as any).backgroundImage as string
            : null;

          return imageUrl ? (
            <Image
              src={imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`}
              alt={data.backgroundImageAlt || "Our Story"}
              fill
              className="object-cover brightness-30"
              priority
              decoding="async"
              sizes="100vw"
              quality={70}
            />
          ) : null;
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
                {data.title}
              </span>
              <br />
              <span className="text-[#CB7856] font-inter inline-block animate-fade-in-up animation-delay-300 relative">
                {data.subTitle}
                {/* Underline decoration */}
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#CB7856] to-transparent animate-expand-width"></div>
              </span>
            </h1>
          </div>

          {/* Description with typewriter effect styling */}
          <div className="animate-fade-in-up animation-delay-600">
            <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl mx-auto text-gray-100">
              {data.description}
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
