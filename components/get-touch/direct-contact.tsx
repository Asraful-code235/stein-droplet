import React, { FC } from "react";
import Image from "next/image";

const DirectContactInfo: FC<any> = ({ data }: any) => {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center text-[36px] text-black">
          {data?.heading?.title}{" "}
          <span className="text-[#CB7856] font-inter">
            {data?.heading?.subTitle}
          </span>
        </h1>

        <p className="text-black text-center">{data?.heading?.description}</p>

        <div className="flex flex-col md:flex-row gap-6 pt-6">
          {data?.contactCards?.map((card: any) => {
            const iconUrl = card?.icon?.url
              ? `${backendURL}${card.icon.url}`
              : null;

            return (
              <div key={card.id} className="flex-1 bg-[#CB7856] p-8 rounded-md">
                <div className="flex flex-col items-center h-full space-y-1">
                  {iconUrl && (
                    <Image
                      src={iconUrl}
                      alt={card.title}
                      width={50}
                      height={50}
                      className="mb-2"
                    />
                  )}
                  <h2 className="text-xl font-semibold text-black min-h-[48px] flex items-center font-playfair capitalize">
                    {card?.title}
                  </h2>
                  <p className="text-[16px] font-inter text-black">
                    {card?.valuetwo}
                  </p>
                  <p className="text-[16px] font-inter text-black">
                    {card?.valueone}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DirectContactInfo;
