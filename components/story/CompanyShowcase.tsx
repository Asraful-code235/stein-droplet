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

  const { teamSection } = data;

  // Helper function to get the best image URL
  const getImageUrl = (
    imageObj: any,
    baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ""
  ) => {
    if (!imageObj) return "";

    // Try to get the best quality image available
    const pickUrl = (
      imageObj.formats?.large?.url ||
      imageObj.formats?.medium?.url ||
      imageObj.formats?.small?.url ||
      imageObj.url
    );

    if (!pickUrl) return "";

    // If already absolute, return as-is
    if (typeof pickUrl === 'string' && /^(https?:)?\/\//.test(pickUrl)) {
      return pickUrl;
    }

    // Otherwise prefix with backend base URL
    return `${baseUrl}${pickUrl}`;
  };

  return (
    <section className="relative ">
      <div className=" relative z-10 ">
        {teamSection && (
          <div className="text-center !pb-28 max-w-7xl w-full mx-auto">
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
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNjQwJyBoZWlnaHQ9JzQ4MCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nNjQwJyBoZWlnaHQ9JzQ4MCcgZmlsbD0nI2VlZWUnIC8+PC9zdmc+"
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
