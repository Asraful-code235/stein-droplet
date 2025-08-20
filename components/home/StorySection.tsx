import React from "react";
import Image from "next/image";
import story from "@/assets/story.png";

const StorySection = ({ discoveryData }: any) => {
  return (
    <div className="bg-white py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-full md:w-1/2 lg:w-2/5">
          <Image
            src={discoveryData?.backgroundImage} 
            
            alt="Stonecraftsmanship"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover w-full h-auto"
            priority
          />
        </div>

        {/* Text on the right */}
        <div className="w-full md:w-1/2 lg:w-3/5">
          <blockquote className="text-xl text-center md:text-left  font-playfair lg:text-4xl italic text-[#101820] leading-snug">
            {discoveryData?.title}
            <br />
            {discoveryData?.subTitle}{" "}
          </blockquote>
          <p className="mt-6 text-lg text-center font-sans text-[#101820]">
            {discoveryData?.description}{" "}
          </p>
          <div className="flex justify-center mt-4">
            <button className="bg-[#CB7856] text-white font-sans font-semibold px-6 py-2 rounded-full transition">
              Discover Our Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySection;
