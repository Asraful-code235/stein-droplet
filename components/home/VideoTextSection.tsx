import React from "react";
import ok from "@/assets/123.jpg";
import backgroundImage from "@/assets/brick1.png";
import Image from "next/image";

const VideoTextSection = () => {
  return (
    <section className="relative py-12 md:py-16 lg:py-20">
      {/* Background Image - covers entire section */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          quality={90}
          priority
          sizes="100vw"
        />
        {/* Orange overlay with opacity */}
        <div className="absolute inset-0 bg-[#B98C3C] bg-opacity-80 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Video Section - Left Side */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl">
              <Image 
                src={ok} 
                alt="Featured content" 
                className="object-cover w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
            </div>
          </div>

          {/* Text Section - Right Side */}
          <div className="w-full lg:w-1/2 text-white mt-6 lg:mt-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Premium Building Materials
            </h2>
            
            <div className="space-y-4">
              <p className="text-sm sm:text-base md:text-[16px] font-normal leading-relaxed sm:leading-loose">
                From modern interior designs to classic exteriors, every product at Marme is carefully selected for durability, style, and performance.  
              </p>
              <p className="text-sm sm:text-base md:text-[16px] font-normal leading-relaxed sm:leading-loose">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Utilla facilis. Potentesque habitant mortet tristique sereectus et netus et malesuada ac turpis egestas.  
              </p>
              <p className="text-sm sm:text-base md:text-[16px] font-normal leading-relaxed sm:leading-loose">
                Whether you're designing a contemporary kitchen, renovating a luxury villa, or constructing a commercial space, our materials define quality and timeless aesthetic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTextSection;