"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n";

const ProductsGrid = ({ data }: any) => {
  const params = useParams();
  const locale = params.locale;
  const { t } = useTranslation();

  const CollectionCard = ({ data }: any) => {
    const imageSrc = data?.backgroundImage;

    const isValidSrc =
      typeof imageSrc === "string" &&
      (imageSrc.startsWith("/") ||
        imageSrc.startsWith("http://") ||
        imageSrc.startsWith("https://"));

    return (
      <Link
        href={`/${locale}/products?category=${data.slug}`}
        className="relative flex gap-5 min-h-[250px] mt-[50px] sm:min-h-[300px] lg:min-h-[320px] md:min-h-[270px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        {isValidSrc ? (
          <Image
            src={imageSrc}
            alt="Background Image"
            fill
            className="object-cover z-0"
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600">No Image Available</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end px-4 sm:px-5 md:px-6 py-6 sm:py-7 md:py-8 text-white z-10">
          <h3 className="text-base sm:text-lg md:text-lg font-bold mb-2 font-inter break-words leading-snug">
            {data?.title || "No Title"}
          </h3>
          <p className="text-gray-200 mb-4 text-xs sm:text-sm md:text-sm font-sans break-words">
            {data?.description || "No Description"}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <div className="lg:max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-8 sm:px-6 md:px-2 mb-10">
        {data.map((product: any) => (
          <CollectionCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
