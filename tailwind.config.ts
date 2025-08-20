import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        source: ["var(--font-source-sans)"],
        playfair: ["var(--font-playfair)"],
      },
         backgroundImage: {
        'product-gradient': '#FFFFFF',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        fontColor: "#F3F4F6",
        darkfontColor: "#121B23",
        gray: "#E5E7EB",
        blue: "#0456BB",
        yellow: "#FDFD0A",
        yellowDark:"#F5C73D",
        darkBlue: "#001B24",
        black: "#000000",
        backgroundColor:"#1D2930",
        darkGray: "#576B75",
        lightGray: "#D1D5DB",
        borderColor: "#E7E5E4",
      },
    },
  },
   images: {
    domains: ['localhost', 'cdn.yourdomain.com'],
  },
  plugins: [],
};
export default config;
