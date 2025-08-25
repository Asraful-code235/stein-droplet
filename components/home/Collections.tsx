"use client";

import Image from "next/image";
import React, { useRef } from "react";
import CollectionGrid from "./CollectionGrid";
import { useParallax } from "react-scroll-parallax";

const Collections = ({ data, collectionCards, locale }: any) => {
  const containerRef = useRef(null);

  const backgroundParallax: any = useParallax({
    speed: -10,
    shouldAlwaysCompleteAnimation: true,
    easing: "easeInQuad",
  });

  const contentParallax: any = useParallax({
    speed: 15,
    easing: "easeInQuad",
  });
  return (
    <div
      id="collections"
      className="relative bg-[#fff]  bg-opacity-15 h-fit lg:h-screen"
      ref={containerRef}
    >
      {/* Background image with parallax */}
      <div ref={backgroundParallax.ref} className="absolute inset-0 -z-10">
        <div className="relative w-full h-[110%]">
          {data?.backgroundImage?.assetUrl ? (
            <Image
              src={data?.backgroundImage?.assetUrl}
              alt="Background"
              fill
              className="brightness-50 object-cover"
              priority
              quality={100}
            />
          ) : null}
        </div>
      </div>

      <div
        ref={contentParallax.ref}
        className="px-4 py-8 md:py-16 lg:py-24 relative z-10 max-w-6xl mx-auto"
      >
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[48px] font-bold text-white">
            {data?.collectionComponent?.title}{" "}
            <span className="text-[#CB7856] font-inter">
              {data?.collectionComponent?.subTitle}
            </span>
          </h2>
          <p className="text-white font-sans md:text-[15px] lg:text-[18px] md:max-w-2xl lg:max-w-3xl mx-auto mt-6">
            {data?.collectionComponent?.description}
          </p>
        </div>

        <div>
          <CollectionGrid locale={locale} collections={collectionCards} />
        </div>
      </div>
    </div>
  );
};

export default Collections;
