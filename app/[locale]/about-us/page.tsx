import { getAboutUsData, getAllCategories, getDiscoveryData } from "@/lib/api";
import React from "react";
import Vision from "@/components/home/Vision";
import QuoteSection from "@/components/home/StorySection";
import Image from "next/image"; // ✅ ADD THIS
import img from "@/assets/about.png";
import { getTranslation } from "@/lib/i18n-server";

export default async function Page({ params }: any) {
  const { t } = getTranslation(params.locale);

  const discoveryData = await getDiscoveryData(params.locale);
  const categoriesData = await getAllCategories(params.locale);
  const getaboutus = await getAboutUsData(params.locale);
  const { categories, details } = categoriesData;
  const { title, subTitle, image, description }: any = getaboutus;
  if (!discoveryData?.discoveryContent) {
    return <div>{t('common.failedToLoadDiscovery')}</div>;
  }

  return (
    <div>
      <div className="text-gray-800">
        <section className="relative w-full h-screen max-w-none">
          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src={image}
              alt="Background"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>

          {/* Centered Text */}
          <div className="flex items-center justify-center h-full px-6">
            <div className="text-center text-white max-w-3xl">
              <h2 className="text-3xl md:text-[48px] font-bold">
                {title}
                <span className="text-[#CB7856] font-inter ml-2">
                  {subTitle} <br className=" md:hidden" />
                </span>
              </h2>
              <p className="mt-6 md:text-[15px] lg:text-[18px]">
                {description}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Vision and Quote Section */}
      {details?.premiumDetails && (
        <Vision details={details} data={categories} />
      )}

      <QuoteSection discoveryData={discoveryData?.discoveryContent} />
    </div>
  );
}
