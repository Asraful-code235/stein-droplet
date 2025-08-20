export default function ProductHeading({data}:any) {
  return (
    <div className=" bg-[#D4C0A8] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-product-gradient">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter text-[#101820] mb-6">
          {data?.title}<span className="text-[#CB7856]">{data?.subTitle}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-sans text-[#101820] leading-relaxed">
         {data?.description}
        </p>
      </div>
    </div>
  );
}
