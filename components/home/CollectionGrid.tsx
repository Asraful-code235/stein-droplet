"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

interface CollectionCardProps {
  id: number;
  backgroundImage: any;
  alt: string;
  slug: string;
  title: string;
  description: string;
  highlight?: string;
  buttonText?: string;
  url: string;
  locale: any;
}

const CollectionGrid = ({ collections, locale }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t } = useTranslation();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount =
        scrollRef.current.firstElementChild?.clientWidth || 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
  const isMobile = window.innerWidth < 640;
  if (!isMobile || !scrollRef.current) return;

  const el = scrollRef.current;
  const scrollAmount = el.firstElementChild?.clientWidth || 300;
  const totalCards = collections.length;
  let currentIndex = 0;

  const scrollNext = () => {
    currentIndex += 1;
    if (currentIndex >= totalCards) {
      currentIndex = 0;
    }
    el.scrollTo({
      left: currentIndex * (scrollAmount + 16), // card width + spacing
      behavior: "smooth",
    });
  };

  const interval = setInterval(scrollNext, 2000);

  return () => clearInterval(interval);
}, [collections.length]);


  const CollectionCard = ({
    backgroundImage,
    alt,
    title,
    slug,
    description,
    highlight,
  }: CollectionCardProps) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative flex-shrink-0 w-[288px] sm:w-full sm:flex gap-5 min-h-[250px] sm:min-h-[300px] lg:min-h-[320px] md:min-h-[270px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <Image
        src={backgroundImage}
        alt={alt}
        objectFit="cover"
        sizes="100vw"
        fill
        className="z-0"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end items-center px-4 sm:px-5 md:px-6 py-6 sm:py-7 md:py-8 text-white z-10">
        <h2 className="text-base sm:text-xl md:text-xl font-bold mb-2 font-inter break-words leading-snug">
          {highlight && title.includes(highlight) ? (
            <>
              {title.split(highlight).map((part, index, arr) => (
                <React.Fragment key={index}>
                  {part}
                  {index < arr.length - 1 && (
                    <span className="text-yellow-500">{highlight}</span>
                  )}
                </React.Fragment>
              ))}
            </>
          ) : (
            title
          )}
        </h2>
        <p className="text-gray-200 mb-4 text-xs sm:text-sm md:text-sm font-sans break-words">
          {description}
        </p>
        <button
          onClick={() => router.push(`${locale}/catalogue/${slug}`)}
          className="bg-[#CB7856] hover:bg-white text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base font-medium hover:text-darkBlue transition-colors duration-300 w-fit group"
        >
          {t('buttons.exploreCatalogue')}{" "}
          <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="lg:max-w-6xl mx-auto">
      {/* Mobile Slider */}
      <div className="block sm:hidden px-4 mb-10 relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20"
        >
          <ChevronRight />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{ whiteSpace: "nowrap" }}
        >
          {collections.map((collection: any) => (
            <div
              key={collection.id}
              className="snap-center w-[288px] flex-shrink-0"
            >
              <CollectionCard {...collection} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-8 sm:px-6 md:px-2 mb-10">
        {collections.map((collection: any) => (
          <CollectionCard key={collection.id} {...collection} />
        ))}
      </div>
    </div>
  );
};

export default CollectionGrid;
