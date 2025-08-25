// components/Hero.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Banner = ({ data ,locale }: any) => {
  return (
    <section className="relative w-full h-fit lg:h-screen flex items-center justify-center py-20">
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src={data?.videoUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="absolute inset-0 bg-[#fff] bg-opacity-15" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="space-y-2 md:space-y-4 lg:mt-8">
            <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight">
              {data?.heroSection?.title} <br className="md:hidden" />
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold italic text-[#CB7856] leading-tight">
              {data?.heroSection?.subTitle} <br className="md:hidden" />
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray max-w-2xl mx-auto">
            {data?.heroSection?.description}
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center">
            <Link href={`${locale}/#collections`} className="bg-[#CB7856] text-white font-semibold px-8 py-3 rounded-full min-w-[200px] text-center">
              {data?.buttonOneTitle}
            </Link>
            <Link href={`${locale}/get-in-touch`}  className="bg-white text-[#CB7856] font-semibold px-8 py-3 rounded-full border-2 border-[#CB7856] min-w-[200px] text-center">
              {data?.buttonTwoTitle}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
