"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

interface StoryContentProps {
  data?: {
    title?: string;
    richContent?: string;
    sideImage?: string;
    sideImageAlt?: string;
    layout?: 'text-left' | 'text-right' | 'text-center';
  };
}

const StoryContent: React.FC<StoryContentProps> = ({ data }) => {
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
    <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-[#101820] mb-6">
            {contentData.title}
          </h2>
          <div className="w-24 h-1 bg-[#CB7856] rounded-full mx-auto"></div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Rich Text Content */}
          <div className="order-2 lg:order-1">
            <div 
              className="prose prose-lg max-w-none text-[#101820] leading-relaxed"
              dangerouslySetInnerHTML={renderRichContent(contentData.richContent || "")}
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.8'
              }}
            />
          </div>

          {/* Side Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <Image
                src={contentData.sideImage || ""}
                alt={contentData.sideImageAlt || "Our story"}
                width={600}
                height={800}
                className="rounded-lg shadow-2xl object-cover w-full h-auto"
              />
              {/* Decorative overlay */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-[#CB7856] rounded-lg -z-10"></div>
            </div>
          </div>
        </div>

        {/* Additional Content Sections */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-[#CB7856] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">20+</span>
            </div>
            <h3 className="text-xl font-bold font-playfair text-[#101820] mb-4">{t('story.yearsOfExcellence')}</h3>
            <p className="text-gray-600 font-sans">{t('story.yearsDescription')}</p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-[#CB7856] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">50+</span>
            </div>
            <h3 className="text-xl font-bold font-playfair text-[#101820] mb-4">{t('story.globalPartners')}</h3>
            <p className="text-gray-600 font-sans">{t('story.partnersDescription')}</p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-[#CB7856] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">1000+</span>
            </div>
            <h3 className="text-xl font-bold font-playfair text-[#101820] mb-4">{t('story.projectsCompleted')}</h3>
            <p className="text-gray-600 font-sans">{t('story.projectsDescription')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryContent;
