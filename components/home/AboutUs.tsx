import Image from "next/image";
import React from "react";
import AboutUsImage from "@/assets/about.png"; // Replace with your actual image path

const AboutUs = () => {
  return (
    <section className="bg-white py-12 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
          {/* Image Section - Right Side */}
          <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-[450px] relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={AboutUsImage}
              alt="Stein Marine materials showcase"
              fill
              
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text Content - Left Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-darkfontColor font-bold mb-6 md:mb-8">
              About us
            </h2>

            <div className="space-y-4 sm:space-y-5 text-gray-700">
              <p className="text-sm sm:text-[15px] md:text-[16px] text-fontColor leading-relaxed sm:leading-loose">
                At Stein Marine, we are passionate about helping people shape
                remarkable spaces. As a leading supplier of premium stone,
                ceramic tiles, and bricks, we serve both residential and
                commercial projects with a focus on quality, design, and
                long-term value.
              </p>

              <p className="text-sm sm:text-[15px] md:text-[16px] text-fontColor leading-relaxed sm:leading-loose">
                Our curated selection of materials combines timeless beauty with
                modern innovation—offering everything from natural stone slabs
                and designer ceramic tiles to classic and architectural bricks.
                Whether you're building from the ground up or undertaking a
                thoughtful renovation, our products are crafted to meet the
                highest standards of durability, aesthetics, and performance.
              </p>

              <p className="text-sm sm:text-[15px] md:text-[16px] text-fontColor leading-relaxed sm:leading-loose">
                What sets us apart is not just our product range, but our
                commitment to partnership. We work closely with builders,
                architects, designers, and homeowners to ensure each project
                reflects a unique vision. Our team brings technical expertise,
                design insight, and dedicated support to every stage of the
                process—from initial selection to final installation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
