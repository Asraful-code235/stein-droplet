"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ParallaxProvider, useParallax } from "react-scroll-parallax";

type ProjectItem = { id: number; title: string; mainImage?: string | null };

const GallerySection = ({
  data,
  projects = [],
  locale,
}: {
  data: any;
  projects?: ProjectItem[];
  locale: any;
}) => {
  const containerRef = useRef(null);

  const backgroundParallax: any = useParallax({
    speed: -10,
    shouldAlwaysCompleteAnimation: true,
    easing: "easeInQuad",
  });

  const gridParallax: any = useParallax({
    speed: 15,
    easing: "easeInQuad",
  });

  return (
    <ParallaxProvider>
      <div className="relative overflow-hidden min-h-screen" ref={containerRef}>
        {/* Background Image with smoother parallax and no gaps */}
        <div ref={backgroundParallax.ref} className="absolute inset-0 -z-10">
          <div className="relative w-full h-[110%]">
            {data?.images?.[0]?.backgroundImage ? (
              <Image
                src={data.images[0].backgroundImage}
                alt="Background"
                fill
                className="brightness-50 object-cover"
                priority
                quality={100}
              />
            ) : (
              <div className="w-full h-full bg-gray-800"></div>
            )}
          </div>
        </div>

        {/* Foreground Content */}
        <div
          ref={gridParallax.ref}
          className="px-4   py-16 relative z-10 max-w-6xl mx-auto"
        >
          {/* Title Section */}
          <div>
            <h1 className="text-[36px] md:text-[48px] font-bold text-[#CB7856] my-4 text-center">
              {data?.title}
            </h1>
            <p className="text-lg text-white text-center mb-8">
              {data?.description} <br />
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(projects?.length ? projects : data?.images || []).map(
              (item: any, index: number) => {
                const imgSrc = item?.mainImageUrl || item?.backgroundImage;
                const title = (item?.title || item?.name || "").toString();
                const subTitle = (item?.subTitle || "").toString();



                return (
                  <Link
                    key={index}
                    href={`/${locale}/projects?category=${item?.heading?.slug || item?.slug || title}`}
                    className={`group relative h-64 sm:h-96 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500`}
                  >
                    <div className="relative w-full h-full">
                      <div className="relative w-full h-[400px]">
                        {imgSrc && (
                          <Image
                            src={imgSrc}
                            alt={title || "image"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            quality={90}
                          />
                        )}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6  transition-opacity duration-500">
                      <span className="text-white text-lg font-medium">
                        {title || "View Project"} {subTitle}
                      </span>
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default GallerySection;
