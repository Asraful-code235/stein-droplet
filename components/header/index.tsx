"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import LanguageSelector from "../home/LanguageSelector";
import Logo from "@/assets/logo.png";
import Image from "next/image";

export default function Navbar({ data, locale }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const shouldShowNavbar = !isScrollingDown || isHoveringTop;

  return (
    <div className="relative z-50 bg-white">
      {/* Transparent hover area to show navbar when scrolling up */}
      <div
        className="fixed top-0 left-0 w-full h-10 z-40"
        onMouseEnter={() => setIsHoveringTop(true)}
        onMouseLeave={() => setIsHoveringTop(false)}
      />

      {/* Main navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${
          shouldShowNavbar ? "translate-y-0" : "-translate-y-full"
        } bg-white shadow-md border border-[#F3F4F6]`}
        onMouseEnter={() => setIsHoveringTop(true)}
        onMouseLeave={() => setIsHoveringTop(false)}
      >
        <div className="container mx-auto px-4 py-1 h-[90px] flex items-center justify-between">
          <Link href={`/${locale}`}>
            <Image
              src={data?.logo?.url}
              alt="logo"
              width={200}
              height={80}
              className="h-auto w-[200px]"
            />
          </Link>
          {/* Desktop nav */}
          <div className="flex justify-center items-center gap-8">
            <nav className="hidden md:block md:mx-[40px]">
              <ul className="flex space-x-6 lg:space-x-14">
                {data?.headerLinks?.map(({ text, url, id }: any) => (
                  <li key={id}>
                    <Link
                      href={`/${locale}/${url}`}
                      className={`text-sm md:text-[14px] font-semibold transition-colors ${
                        pathname === url
                          ? "text-[#CB7856]"
                          : "text-darkBlue hover:text-primary"
                      } ${
                        text === "Get Quote"
                          ? "!text-white bg-[#CB7856] p-3 rounded-full"
                          : ""
                      }`}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="items-center hidden md:block">
              <LanguageSelector />
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden flex items-center gap-3">
              <LanguageSelector />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#CB7856] focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <FiX size={24} color="black" />
                ) : (
                  <FiMenu size={24} color="black" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile full screen menu */}
      {isOpen && (
        <div className="fixed inset-0 mt-10 z-40 bg-white p-6 md:hidden transition-all duration-300 ease-in-out">
          <ul className="flex flex-col space-y-6 mt-10">
            {data?.headerLinks?.map(({ id, text, url }: any) => (
              <li key={id}>
                <Link
                  href={`/${locale}/${url}`}
                  className={`block text-lg font-semibold ${
                    pathname === url
                      ? "text-[#CB7856]"
                      : "text-darkBlue hover:text-primary"
                  } ${
                    text === "Get Quote"
                      ? "bg-[#CB7856] text-white max-w-[200px] px-4 py-2 rounded-md"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
