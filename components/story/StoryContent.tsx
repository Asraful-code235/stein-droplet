"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

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

  console.log("data",data)
  const { t } = useTranslation();

  // Fallback content for when backend is not ready
  const fallbackData = {
    title: t('story.ourJourney'),
    richContent: `
      <p>Founded in 2001, our company began as a small family business with a simple vision: to bring the world's most beautiful natural materials to discerning architects, designers, and homeowners.</p>
      
      <h3>The Beginning</h3>
      <p>What started in a modest warehouse has grown into one of Europe's most trusted suppliers of premium building materials. Our founder, driven by a passion for natural beauty and craftsmanship, traveled the globe to source the finest stones and ceramics.</p>
      
      <blockquote>"Every stone tells a story, every ceramic holds a dream. We are simply the storytellers who bring these dreams to life."</blockquote>
      
      <h3>Our Philosophy</h3>
      <p>We believe that the materials we choose for our spaces should inspire us daily. Whether it's the warm embrace of natural travertine, the sleek sophistication of premium ceramics, or the timeless appeal of handcrafted bricks, each material we offer is selected for its ability to transform spaces and elevate experiences.</p>
      
      <h3>Sustainability & Craftsmanship</h3>
      <p>Our commitment extends beyond beauty to sustainability and ethical sourcing. We work directly with quarries and manufacturers who share our values of environmental responsibility and fair labor practices.</p>
    `,
    sideImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sideImageAlt: "Craftsman working with natural stone",
    layout: 'text-left'
  };

  const contentData = data || fallbackData;

  // Function to render rich content safely
  const renderRichContent = (content: string) => {
    return { __html: content };
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-white py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
              {contentData.title}
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

              <div
                className="prose prose-xl max-w-none text-[#101820] leading-relaxed relative z-10"
                dangerouslySetInnerHTML={renderRichContent(contentData.richContent || "")}
                style={{
                  fontSize: '1.2rem',
                  lineHeight: '1.9'
                }}
              />

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
                const imageUrl = typeof contentData.sideImage === 'object' && contentData.sideImage?.url
                  ? contentData.sideImage.url
                  : typeof contentData.sideImage === 'string'
                  ? contentData.sideImage
                  : null;

                return imageUrl ? (
                  <div className="relative group">
                    <Image
                      src={imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`}
                      alt={contentData.sideImageAlt || "Our story"}
                      width={400}
                      height={600}
                      className="rounded-2xl shadow-2xl object-cover w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Floating decorative elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#CB7856] rounded-full opacity-80"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-slate-300 rounded-full opacity-60"></div>
                  </div>
                ) : (
                <div className="relative">
                  {/* Creative placeholder with geometric design */}
                  <div className="w-full h-[600px] bg-gradient-to-br from-slate-100 via-white to-slate-200 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Geometric pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#CB7856] rounded-lg rotate-12"></div>
                      <div className="absolute bottom-20 right-10 w-16 h-16 bg-[#CB7856] rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-slate-300 rounded-full"></div>
                    </div>
                    <div className="text-center z-10">
                      <div className="w-16 h-16 bg-[#CB7856] rounded-full mx-auto mb-4 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white rounded-full"></div>
                      </div>
                      <span className="text-slate-500 text-lg font-light">Visual Story</span>
                      <p className="text-slate-400 text-sm mt-2">Coming Soon</p>
                    </div>
                  </div>
                  {/* Floating decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#CB7856] rounded-full opacity-80 animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-slate-300 rounded-full opacity-60 animate-pulse delay-500"></div>
                </div>
              );
            })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryContent;
