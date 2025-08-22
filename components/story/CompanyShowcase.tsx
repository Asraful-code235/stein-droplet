"use client";
import React from "react";
import Image from "next/image";

interface CompanyShowcaseProps {
  data?: {
    title?: string;
    description?: string;
    images?: Array<{
      id: number;
      url: {
        url?: string;
        formats?: {
          large?: { url: string };
          medium?: { url: string };
          small?: { url: string };
        };
      };
      alt: string;
      caption?: string;
    }>;
    teamSection?: {
      title?: string;
      description?: string;
      teamImage?: {
        url?: string;
        formats?: {
          large?: { url: string };
          medium?: { url: string };
        };
      };
      teamImageAlt?: string;
    };
  };
}

const CompanyShowcase: React.FC<CompanyShowcaseProps> = ({ data }) => {
  // Return null if no data is provided
  if (!data) {
    return null;
  }

  const { title, description, images, teamSection } = data;

  // Helper function to get the best image URL
  const getImageUrl = (
    imageObj: any,
    baseUrl = "https://backend.steinmarine.de"
  ) => {
    if (!imageObj) return "";

    // Try to get the best quality image available
    if (imageObj.formats?.large?.url) {
      return `${baseUrl}${imageObj.formats.large.url}`;
    }
    if (imageObj.formats?.medium?.url) {
      return `${baseUrl}${imageObj.formats.medium.url}`;
    }
    if (imageObj.formats?.small?.url) {
      return `${baseUrl}${imageObj.formats.small.url}`;
    }
    if (imageObj.url) {
      return `${baseUrl}${imageObj.url}`;
    }
    return "";
  };

  return (
    <section className="relative ">
      <div className=" relative z-10 ">
        <div className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
          {/* Creative Section Header */}ƒ
          <div className="text-center mb-20">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-playfair text-white mb-6 relative">
                {title}
                {/* Glowing effect */}
                <div className="absolute inset-0 text-5xl md:text-6xl lg:text-7xl font-bold font-playfair text-[#CB7856] opacity-30 blur-sm">
                  {title}
                </div>
              </h2>

              {/* Creative underline with animation */}
              <div className="flex justify-center items-center mt-8 space-x-4">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#CB7856] animate-pulse"></div>
                <div className="w-4 h-4 bg-[#CB7856] rounded-full animate-bounce"></div>
                <div className="w-32 h-px bg-[#CB7856] animate-pulse"></div>
                <div className="w-4 h-4 bg-[#CB7856] rounded-full animate-bounce delay-300"></div>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#CB7856] animate-pulse"></div>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed mt-8 text-white">
              {description}
            </p>
          </div>
          {/* Image Gallery Section */}
          {images && images.length > 0 && (
            <div className="mb-20 max-w-7xl w-full mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {images.map((image, index) => {
                  const imageUrl = getImageUrl(image.url);
                  if (!imageUrl) return null;

                  return (
                    <div
                      key={image.id}
                      className="group relative overflow-hidden rounded-2xl bg-slate-800 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Caption overlay */}
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-white font-medium text-lg mb-2">
                              {image.caption}
                            </p>
                            <div className="w-12 h-1 bg-[#CB7856] rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          ƒ
        </div>

        {/* Team Section */}
        {teamSection && (
          <div className="text-center !py-28 max-w-7xl w-full mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold font-playfair text-[#CB7856] mb-16 relative">
              {teamSection.title}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#CB7856] to-transparent"></div>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Team Image */}
              {teamSection.teamImage && (
                <div className="relative group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                    <Image
                      src={getImageUrl(teamSection.teamImage)}
                      alt={teamSection.teamImageAlt || "Our team"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              )}

              {/* Team Description */}
              <div className="space-y-8">
                {teamSection.description && (
                  <div className="relative">
                    <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed  text-left">
                      {teamSection.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyShowcase;
