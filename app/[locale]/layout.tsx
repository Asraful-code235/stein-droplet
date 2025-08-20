import Navbar from "../../components/header";
import Footer from "../../components/Footer";
import { Playfair_Display, Inter, Source_Sans_3 } from "next/font/google";
import { Metadata } from "next";
import ParallaxInitializer from "@/components/ParallaxInitializer";
import "../globals.css";
import { ReactNode } from "react";
import CookieBanner from "@/components/cookies";
import { getLayoutData } from "@/lib/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Stein Marine",
  description: "Stein Marine",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: any;
  params: { locale: string };
}) {
  const Data = await getLayoutData(params?.locale);
  return (
    <>
      <Navbar data={Data} />
      <ParallaxInitializer>
        <ToastContainer position="top-right" autoClose={5000} />

        <div className="mt-[90px]">{children}</div>
      </ParallaxInitializer>
      <CookieBanner />
      <Footer data={Data} />
    </>
  );
}
