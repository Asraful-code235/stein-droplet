"use client";
import React from "react";
import Image from "next/image";
// No translation fallback needed here; rely solely on backend data

interface StoryContentProps {
  data?: {
    title?: string;
    richContent?: string;
    sideImage?: {
      url?: string;
    };
    sideImageAlt?: string;
    layout?: 'text-left' | 'text-right' | 'text-center';
  };
}

const StoryContent: React.FC<StoryContentProps> = ({ data }) => {

  // No fallback: if no backend data, render nothing
  if (!data) return null;

  // Function to render rich content safely
  const renderRichContent = (content: string) => {
    return { __html: content };
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-white py-20 md:py-32 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-40 h-40 bg-[#CB7856] opacity-5 rounded-full"></div>
        <div className="absolute bottom-40 -right-20 w-60 h-60 bg-slate-200 opacity-30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-[#CB7856] rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-slate-400 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Creative Section Title */}
        <div className="text-center mb-20">
          <div className="inline-block relative">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-playfair text-[#101820] mb-6 relative">
              {data.title}
              {/* Creative underline */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#CB7856] to-transparent"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-px bg-[#CB7856] opacity-60"></div>
            </h2>
          </div>
        </div>

        {/* Main Content with Creative Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Rich Text Content - Takes up more space */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="relative">
              {/* Quote mark decoration */}
              <div className="absolute -top-6 -left-6 text-8xl text-[#CB7856] opacity-20 font-serif leading-none">"</div>

              {data.richContent && (
                <div
                  className="prose prose-xl max-w-none text-[#101820] leading-relaxed relative z-10"
                  dangerouslySetInnerHTML={renderRichContent(data.richContent)}
                  style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.9'
                  }}
                />
              )}

              <div className="mt-8 flex items-center">
                <div className="w-12 h-px bg-[#CB7856]"></div>
                <div className="w-3 h-3 bg-[#CB7856] rounded-full mx-4"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-[#CB7856] to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Side Visual Element */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="relative">
              {(() => {
                const imageUrl = typeof data.sideImage === 'object' && data.sideImage?.url
                  ? data.sideImage.url
                  : typeof (data as any).sideImage === 'string'
                  ? (data as any).sideImage as string
                  : null;

                return imageUrl ? (
                  <div className="relative group">
                    <Image
                      src={imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`}
                      alt={data.sideImageAlt || "Our story"}
                      width={400}
                      height={600}
                      className="rounded-2xl shadow-2xl object-cover w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 400px"
                      placeholder="blur"
                      loading="lazy"
                      quality={70}
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNDAwJyBoZWlnaHQ9JzYwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nNDAwJyBoZWlnaHQ9JzYwMCcgZmlsbD0nI2VlZWUnIC8+PC9zdmc+"
                    />
                    {/* Floating decorative elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#CB7856] rounded-full opacity-80"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-slate-300 rounded-full opacity-60"></div>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryContent;
