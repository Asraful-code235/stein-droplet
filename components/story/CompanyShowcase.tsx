"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

interface CompanyShowcaseProps {
  data?: {
    title?: string;
    description?: string;
    images?: Array<{
      id: number;
      url: string;
      alt: string;
      caption?: string;
    }>;
    teamSection?: {
      title?: string;
      description?: string;
      teamImage?: string;
      teamImageAlt?: string;
    };
  };
}

const CompanyShowcase: React.FC<CompanyShowcaseProps> = ({ data }) => {
  const { t } = useTranslation();

  // Fallback data for when backend is not ready
  const fallbackData = {
    title: t('story.behindTheScenes'),
    description: t('story.showcaseDescription'),
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Our warehouse facility",
        caption: t('story.ourModernWarehouse')
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Quality control process",
        caption: t('story.rigorousQualityControl')
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Material selection",
        caption: t('story.carefulMaterialSelection')
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Packaging and delivery",
        caption: t('story.professionalPackaging')
      }
    ],
    teamSection: {
      title: t('story.ourDedicatedTeam'),
      description: t('story.teamDescription'),
      teamImage: "https://images.unsplash.com/photo-1600607688960-47d4e1e4b5b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      teamImageAlt: t('story.ourTeamAtWork')
    }
  };

  const showcaseData = data || fallbackData;

  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-[#101820] mb-6">
            {showcaseData.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-sans max-w-3xl mx-auto leading-relaxed">
            {showcaseData.description}
          </p>
          <div className="w-24 h-1 bg-[#CB7856] rounded-full mx-auto mt-6"></div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {showcaseData.images?.map((image, index) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={image.url}
                alt={image.alt}
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-sans text-sm">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Team Image */}
            <div className="relative h-64 lg:h-auto">
              <Image
                src={showcaseData.teamSection?.teamImage || ""}
                alt={showcaseData.teamSection?.teamImageAlt || "Our team"}
                fill
                className="object-cover"
              />
            </div>

            {/* Team Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold font-playfair text-[#101820] mb-6">
                {showcaseData.teamSection?.title}
              </h3>
              <p className="text-lg text-gray-600 font-sans leading-relaxed mb-8">
                {showcaseData.teamSection?.description}
              </p>
              
              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#CB7856] text-white font-sans font-semibold px-8 py-3 rounded-full hover:bg-[#B86A4A] transition-colors duration-300">
                  {t('buttons.meetOurTeam')}
                </button>
                <button className="border-2 border-[#CB7856] text-[#CB7856] font-sans font-semibold px-8 py-3 rounded-full hover:bg-[#CB7856] hover:text-white transition-all duration-300">
                  {t('buttons.joinOurTeam')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl md:text-4xl font-bold font-playfair text-[#101820] mb-12">{t('story.ourValues')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-20 h-20 bg-[#CB7856] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl">🏆</span>
              </div>
              <h4 className="text-xl font-bold font-playfair text-[#101820] mb-4">{t('story.excellence')}</h4>
              <p className="text-gray-600 font-sans">{t('story.excellenceDescription')}</p>
            </div>

            <div className="p-6">
              <div className="w-20 h-20 bg-[#CB7856] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl">🌱</span>
              </div>
              <h4 className="text-xl font-bold font-playfair text-[#101820] mb-4">{t('story.sustainability')}</h4>
              <p className="text-gray-600 font-sans">{t('story.sustainabilityDescription')}</p>
            </div>

            <div className="p-6">
              <div className="w-20 h-20 bg-[#CB7856] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl">🤝</span>
              </div>
              <h4 className="text-xl font-bold font-playfair text-[#101820] mb-4">{t('story.partnership')}</h4>
              <p className="text-gray-600 font-sans">{t('story.partnershipDescription')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyShowcase;
