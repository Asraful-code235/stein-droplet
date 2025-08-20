"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import earth from "@/assets/Earth.png";
const Image: any = require("next/image").default;

const languages = [
  { name: "English", code: "en" },
  { name: "German", code: "de" },
] as const;

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const langCodes = languages.map((l) => l.code);
  const ArrowIcon: any = IoIosArrowDown;

  const pathSegments: any = pathname.split("/").filter(Boolean);
  const currentLangCode = langCodes.includes(pathSegments[0])
    ? pathSegments[0]
    : "en";
  const currentLanguage =
    languages.find((l) => l.code === currentLangCode)?.name || "English";

  const handleLanguageChange = (newLangCode: string) => {
    const filteredSegments = pathSegments.filter(
      (segment: any) => !langCodes.includes(segment as any)
    );
    const newPath =
      filteredSegments.length > 0
        ? `/${newLangCode}/${filteredSegments.join("/")}`
        : `/${newLangCode}`;

    router.push(newPath);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 px-2 py-1 text-sm text-black rounded-md hover:bg-gray-100"
      >
        <Image src={earth} alt="Language" height={20} width={20} />
        <span className="text-[14px] text-[#000000]">{currentLanguage}</span>
        <ArrowIcon
          className={`w-4 h-4 transition-all duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 mt-5 w-32 bg-white text-black shadow-lg z-10">
          {languages.map(({ name, code }) => (
            <button
              key={code}
              className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 hover:bg-blue hover:text-white"
              onClick={() => handleLanguageChange(code)}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
