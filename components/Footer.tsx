"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsGeoAlt, BsTelephone, BsEnvelope, BsClock } from "react-icons/bs";
import facebook from "@/assets/facebook.png";
import instagram from "@/assets/instagram.png";
import Linked from "@/assets/linked.png";
import Youtube from "@/assets/youtube.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function Footer({ data }: any) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialMedia = [
    {
      icon: facebook,
      alt: "Facebook",
      url: "https://www.facebook.com/login/",
    },
    {
      icon: instagram,
      alt: "Instagram",
      url: "https://www.instagram.com/accounts/login/",
    },
    {
      icon: Linked,
      alt: "LinkedIn",
      url: "https://www.linkedin.com/login",
    },
    {
      icon: Youtube,
      alt: "YouTube",
      url: "https://accounts.google.com/ServiceLogin?service=youtube",
    },
  ];

  const navigateToCatalogueSection = (url: string) => {
    router.replace(`/products?category=${url}`);
  };

  return (
    <footer className="bg-[#FFFFFF] border-t border-gray-200">
      <div className="px-4 max-w-6xl mx-auto sm:px-6 lg:px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Logo & Tagline */}
        <div className="space-y-4">
          <Link href="/">
            <Image
              src={data?.logo?.url}
              alt="logo"
              width={200}
              height={80}
              className="h-auto w-[200px]"
            />
          </Link>
          <p className="text-[#101820] font-sans">{data?.footer?.tagline}</p>
          <div className="flex space-x-4">
            {socialMedia.map((social, index) => (
              <div
                key={index}
                onClick={() => window.open(social.url, "_blank")}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Image src={social.icon} alt={social.alt} width={25} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg text-[#101820] font-semibold font-inter">
            {t('footer.quickLinks')}
          </h3>
          <ul className="space-y-2 text-gray-600 font-sans">
            {data?.footer?.quickLinks.map((item: any, i: number) => (
              <li key={i}>
                <a
                  href={item.path}
                  className="hover:underline text-[16px] text-[#101820] cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(item.url);
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Materials */}
        <div className="space-y-4">
          <h3 className="text-lg text-[#101820] font-semibold font-inter">
            {t('footer.ourMaterials')}
          </h3>
          <ul className="space-y-2 text-gray-600 font-sans">
            {data?.footer?.materialLinks.map((item: any) => (
              <li key={item.id}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToCatalogueSection(item.url);
                  }}
                  className="hover:underline text-[16px] text-[#101820] cursor-pointer"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Get In Touch - Hydration Safe */}
        <div className="space-y-4">
          <h3 className="text-lg text-[#101820] font-semibold font-inter">
            {t('footer.getInTouch')}
          </h3>
          {mounted && (
            <div className="flex flex-col text-gray-600 gap-y-2">
              <div className="flex items-center gap-2">
                <BsGeoAlt className="text-[#101820] text-[20px]" />
                <p className="flex-1 hover:underline text-[16px] text-[#101820] font-sans">
                  {data?.footer?.contactInfo?.address}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <BsTelephone className="text-[#101820] text-[18px]" />
                <p className="flex-1 hover:underline text-[16px] text-[#101820] font-sans">
                  {t('footer.tel')}: {data?.footer?.contactInfo?.phone}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <BsEnvelope className="text-[#101820] text-[18px]" />
                <p className="flex-1 hover:underline text-[16px] text-[#101820] font-sans">
                  {t('footer.email')}: {data?.footer?.contactInfo?.email}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <BsClock className="text-[#101820] text-[18px]" />
                <p className="flex-1 hover:underline text-[16px] text-[#101820] font-sans">
                  {t('footer.hours')}: {data?.footer?.contactInfo?.time}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="text-[#101820] max-w-6xl mx-auto" />
        <div className="max-w-6xl mx-auto py-4 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-600">
          <p className="text-[16px] text-white p-3 font-sans">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
