export default function ProductsBanner() {
  return (
    <div className=" mx-auto bg-[#D4C0A8] px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-product-gradient">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter text-black mb-6">
          Products <span className="text-[#CB7856]">Collection</span>
        </h1>
        <p className="text-lg md:text-xl  max-w-3xl mx-auto font-sans text-black leading-relaxed">
          Explore our collection of premium stone, ceramic, and brick
          <br />
          installations that transform spaces into extraordinary experiences.
        </p>
      </div>
    </div>
  );
}
