"use client";
import { useTranslation } from "@/lib/i18n";

export default function GalleryTabs({ setSelectedTab, selectedTab }: any) {
  const { t } = useTranslation();

  const tabs = [
    { key: "restaurants", label: t('gallery.restaurants') },
    { key: "hotels", label: t('gallery.hotels') },
    { key: "residential", label: t('gallery.residential') },
    { key: "publicBuildings", label: t('gallery.publicBuildings') }
  ];

  return (
    <div className="flex justify-center gap-3 my-8 flex-wrap">
      {tabs.map((tab) => {
        const isActive = selectedTab === tab.label;

        return (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.label)}
            className={`
              px-4 py-2 min-w-[150px] font-inter rounded-full
              transition-all duration-300 ease-in-out font-medium
              transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${
                isActive
                  ? "bg-[#CB7856] text-[#1D2930] hover:bg-yellow-600 focus:ring-yellow-500"
                  : "bg-[#D4C0A8] bg-opacity-60 border border-[#CB7856] text-black hover:bg-[#CB7856] focus:ring-gray-500"
              }
              shadow-md hover:shadow-lg
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
