import Image from "next/image";
import React from "react";
import material from "@/assets/material.png";

const Materials = () => {
  return (
    <section className="bg-white py-12 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
          {/* Text Content - Left Side */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-darkfontColor font-bold mb-6 md:mb-8">
              Materials You Can Trust
            </h2>

            <div className="space-y-4 sm:space-y-5">
              <p className="text-sm sm:text-[15px] md:text-[16px] leading-relaxed sm:leading-loose text-fontColor">
                From contemporary interior spaces to timeless architectural
                exteriors, every product at Stein Marine is carefully selected
                to meet the highest standards of quality, durability, and
                design. We understand that materials are more than just building
                blocks—they are the foundation of beautiful, functional spaces
                that reflect personality, purpose, and craftsmanship.
              </p>
              <p className="text-sm sm:text-[15px] md:text-[16px] leading-relaxed sm:leading-loose text-fontColor">
                That's why our range of stone, ceramic tiles, and bricks is
                curated to offer both versatility and performance, catering to a
                wide variety of design styles and structural requirements.
                Whether you're designing a minimalist kitchen, a luxurious
                bathroom, a bold commercial façade, or a warm, inviting outdoor
                living space, our materials are engineered to perform.
              </p>
              <p className="text-sm sm:text-[15px] md:text-[16px] leading-relaxed sm:leading-loose text-fontColor">
                With textures, finishes, and colors that complement both modern
                and traditional architecture, our collection is designed to help
                you achieve a seamless blend of style and substance.
              </p>
            </div>
          </div>

          {/* Image Section - Right Side */}
          <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-[450px] relative rounded-lg overflow-hidden shadow-lg order-1 lg:order-2">
            <Image
              src={material}
              alt="Stein Marine materials showcase"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Materials;
