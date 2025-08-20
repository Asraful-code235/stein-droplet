"use client";
import { useState } from "react";
// import breakdown from "@/assets/breakdown.png";
// import stopwatch from "@/assets/stopwatch.png";
// import consultation from "@/assets/consultations.png";
// import Image from "next/image";

import Image from "next/image";
import React, { useRef } from "react";

import BackgroundImage from "@/assets/vision.png";
import { useParallax } from "react-scroll-parallax";
import ProductsGrid from "./ProductsGrid";

const Collections = ({ data, details }: any) => {
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
    <div className="relative h-fit lg:h-screen" ref={containerRef}>
      <div ref={backgroundParallax.ref} className="absolute inset-0 -z-10">
        <div className="relative w-full h-[120%]">
          <Image
            src={details?.premiumBackgroundImage}
            alt="Background"
            fill
            className="brightness-50 object-cover"
            priority
                                          sizes="100vw"

            quality={100}
          />
        </div>
      </div>

      <div
        ref={contentParallax.ref}
        className="px-4 py-8 md:py-16 lg:py-24 relative z-10 max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[48px] font-bold text-white">
            {details?.premiumDetails?.title}{" "}
            <span className="text-[#CB7856] font-inter">
              {details?.premiumDetails?.subTitle} <br className="md:hidden" />
            </span>
          </h2>
          <p className="text-white font-sans md:text-[15px] lg:text-[18px] md:max-w-2xl lg:max-w-3xl mx-auto mt-6">
            {details?.premiumDetails?.description}
          </p>
        </div>

        <div>
          <ProductsGrid data={data} />
        </div>
      </div>
    </div>
  );
};

export default Collections;

