"use client";

import { useState, useEffect } from "react";
import { Swiper as SwiperOriginal, SwiperSlide as SwiperSlideOriginal } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { SwiperProps, SwiperSlideProps } from "swiper/react";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import { useParams, useRouter } from "next/navigation";
import { useProductById } from "@/hooks/useApi";
import { useTranslation } from "@/lib/i18n";

export default function ProductDetails() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantityM2, setQuantityM2] = useState<number>(1);
  const [quantityBox, setQuantityBox] = useState<number>(1);

  const router = useRouter();
  const params = useParams();
  const id = params.slug as string;
  const locale = params.locale as string;
  const { t } = useTranslation();

  // Use TanStack Query for real-time data
  const { data: product, isLoading, error } = useProductById(locale, id);

  // Set initial size when product loads
  useEffect(() => {
    if (product?.variations?.sizes?.length > 0) {
      const firstSize = product!.variations.sizes[0];
      if (firstSize.sizes?.length > 0 && !selectedSize) {
        setSelectedSize(firstSize.sizes[0].size);
      }
    }
  }, [product, selectedSize]);

  const getCurrentSizeDetails = () => {
    if (!product?.variations?.sizes) return null;

    return product.variations.sizes.find((sizeGroup: any) =>
      sizeGroup.sizes.some((size: any) => size.size === selectedSize)
    );
  };

  const currentSize = getCurrentSizeDetails();
  const pricePerM2 = currentSize?.m2Price || 0;
  const pricePerBox = currentSize?.boxPrice || 0;

  // ✅ Robust area calculator
  const calculateAreaPerBox = (size: string): number => {
    if (!size || size.toLowerCase() === "sample*") return 0;

    try {
      const cleaned = size.toLowerCase().replace(/\s/g, "");
      const [widthStr, heightStr] = cleaned.split("x");
      const width = parseFloat(widthStr.replace("cm", "")) / 100;
      const height = parseFloat(heightStr.replace("cm", "")) / 100;
      if (isNaN(width) || isNaN(height)) return 0;
      return width * height;
    } catch {
      return 0;
    }
  };

  const areaPerBox = calculateAreaPerBox(selectedSize);
  const calculatedM2 = (areaPerBox * quantityBox).toFixed(3);
  const totalPriceM2 = (quantityM2 * pricePerM2).toFixed(2);
  const totalPriceBox = (quantityBox * pricePerBox).toFixed(2);

  const Swiper = SwiperOriginal as React.FC<SwiperProps & { children?: React.ReactNode }>;
  const SwiperSlide = SwiperSlideOriginal as React.FC<SwiperSlideProps & { children?: React.ReactNode }>;

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 bg-[#CFBDA0] pt-28">
        {/* Skeleton UI */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="w-full h-[500px] bg-gray-300 rounded animate-pulse"></div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-6 bg-[#CB7856] p-6 rounded shadow-md">
            <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse" />
            <div>
              <div className="h-6 w-1/3 bg-gray-300 rounded mb-2 animate-pulse" />
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-8 w-16 bg-gray-300 rounded animate-pulse" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-4 w-1/2 bg-gray-300 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 bg-[#CFBDA0] pt-28 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">Error loading product</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen p-8 bg-[#CFBDA0] pt-28 flex items-center justify-center">
        <p className="text-xl">{t('product.notFound')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-[#CFBDA0] pt-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="h-full mt-3">
          <Swiper
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper as any }}
            navigation={true}
            modules={[Thumbs, Navigation]}
            className="w-full border relative h-[500px]"
          >
            {product?.backgroundImage?.map((src: any, i: number) => (
              <SwiperSlide key={i}>
                <div className="w-full h-[500px] overflow-hidden">
                  <img
                    src={src?.url}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper as any}
            spaceBetween={10}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            className="mt-4"
          >
            {product?.backgroundImage?.map((src: any, i: number) => (
              <SwiperSlide key={i}>
                <div className="overflow-hidden border rounded h-[120px] w-full">
                  <img
                    src={src?.url}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info Panel */}
        <div className="space-y-6 bg-[#CB7856] p-6 rounded shadow-md">
          <div>
            <h1 className="text-2xl font-bold text-white mb-3">{product.name}</h1>
            {product.description && (
              <div className="text-white text-sm leading-relaxed mb-4">
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
            )}
          </div>

          <div>
            <p className="font-semibold text-lg text-white font-sans mb-0">
              {t('product.availableSizes')}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variations?.sizes?.flatMap((group: any) =>
                group.sizes.map((size: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(size.size)}
                    className={`border px-3 py-1 rounded font-sans transition ${
                      selectedSize === size.size
                        ? "bg-white text-[#CB7856] font-semibold"
                        : "text-white hover:text-[#fff] hover:font-semibold"
                    }`}
                  >
                    {size.size}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="text-sm space-y-1 text-white font-sans">
            <p>
              <strong>{t('product.byM2')}:</strong> € {pricePerM2}
            </p>
            <p>
              <strong>{t('product.byBox')}:</strong> € {pricePerBox}
            </p>
            <p className="text-gray-200 italic text-xs">
              {product?.taxInfo || t('product.taxShipping')}
            </p>
          </div>

          {/* Quantity/Price Section */}
          <div>
            <p className="font-semibold text-lg mb-2 text-white font-inter">
              {t('product.calculatePrice')}
            </p>
            <div className="space-y-3 max-w-[100%]">
              {/* Quantity M2 Input */}
              <div className="flex justify-between items-center">
                <strong className="text-sm text-white">
                  {t('product.quantityM2')}
                </strong>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={quantityM2}
                  onChange={(e) => setQuantityM2(parseFloat(e.target.value) || 0)}
                  className="max-w-[90px] font-sans text-white bg-[#CB7856] mt-1 px-3 py-1.5 border rounded text-sm"
                />
              </div>

              {/* Calculated M2 from box */}
              <div className="text-sm text-white font-inter flex justify-between">
                <strong>{t('product.quantityM2Calculated')}:</strong>
                <p>{calculatedM2}</p>
              </div>

              {/* Box Quantity */}
              <div className="flex justify-between items-center">
                <strong className="text-white">
                  {t('product.quantityBox')}
                </strong>
                <div className="flex items-center mt-1">
                  <button
                    onClick={() => setQuantityBox((prev) => Math.max(prev - 1, 1))}
                    className="w-8 h-8 text-white border bg-[#CB7856] rounded rounded-r-none"
                  >
                    -
                  </button>
                  <span className="text-sm flex justify-center items-center h-8 font-sans w-14 text-center border border-white text-white">
                    {quantityBox}
                  </span>
                  <button
                    onClick={() => setQuantityBox((prev) => prev + 1)}
                    className="w-8 h-8 text-white bg-[#CB7856] border rounded rounded-l-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Prices */}
              <div className="text-white space-y-1">
                <div className="text-xl font-bold font-inter">
                  € {totalPriceM2}
                  <div className="text-sm font-normal">
                    {t('product.byM2Total')}
                  </div>
                </div>
                <div className="text-xl font-bold font-inter">
                  € {totalPriceBox}
                  <div className="text-sm font-normal">
                    {t('product.byBox')} total
                  </div>
                </div>
              </div>

              <p className="text-xs text-white font-inter">
                {product?.deliveryInfo ? (
                  <div dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} />
                ) : (
                  t('product.deliveryInfo')
                )}
              </p>

              <div className="flex justify-center items-center w-full">
                <button
                  onClick={() => router.push(`/${params.locale}/get-in-touch`)}
                  className="text-sm md:text-[14px] w-full mx-auto hover:bg-white hover:text-black border border-white rounded-lg p-2 font-semibold transition-colors text-white"
                >
                  {t('buttons.getQuote')}
                </button>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-xs text-white font-inter pt-2 border-t">
            {product?.footerNote ? (
              <div dangerouslySetInnerHTML={{ __html: product.footerNote }} />
            ) : (
              t('product.footerNote')
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
