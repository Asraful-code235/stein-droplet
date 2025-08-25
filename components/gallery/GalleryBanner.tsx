export default function GalleryBanner({ data }: any) {
  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-product-gradient">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter mb-6 text-[#CB7856]">
          {data?.title} <span className="text-[#CB7856]">{data?.subTitle}</span>
        </h1>
        <p className="text-lg md:text-xl  max-w-3xl mx-auto font-sans text-white leading-relaxed">
          {data?.description}
        </p>
      </div>
    </div>
  );
}
