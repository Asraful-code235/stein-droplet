
import { Playfair_Display, Inter, Source_Sans_3 } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";


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
  return (
    <html
      lang={params.locale}
      className={`${inter.variable} ${sourceSans.variable} ${playfair.variable}`}
    >
      <body>
          <div className="mt-[90px]">{children}</div>
      </body>
    </html>
  );
}
