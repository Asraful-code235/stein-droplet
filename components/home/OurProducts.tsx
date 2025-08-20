import Image from "next/image";
import React from "react";
import ProfuctImg from "@/assets/cracked-cement.png";
import stone from "@/assets/stone.png";
import mask from "@/assets/mask.png";

const OurProducts = () => {
  const products = [
    { name: "Stone", image: stone },
    { name: "Brick", image: mask },
    { name: "Ceramic", image: mask },
  ];

  return (
    <section className="relative py-12 md:py-8 lg:py-24 bg-[#BFE2FF94]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={ProfuctImg}
          alt="Products background"
          fill
          className="object-cover"
          priority
          quality={80}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-fontColor mb-8 sm:mb-10 md:mb-12 text-center">
          Our Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <div key={index} className="group text-center">
              <div className="relative h-64 sm:h-80 md:h-[350px] lg:h-[400px] w-full mb-3 sm:mb-4 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={product.image}
                  alt={"prod"}
                  fill

                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-fontColor">
                {product.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
