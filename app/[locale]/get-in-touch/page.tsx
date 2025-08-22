import TouchHeading from "@/components/get-touch/get-touch-heading";
import MessageFormComponent from "@/components/get-touch/message-form-component";
import QuoteFormComponent from "@/components/get-touch/quote-form-component";
import {
  getRequestFormData,
  getAllCategories,
  getInTouchHeadingData,
  getDirectContactData,
} from "@/lib/api";
import dynamic from "next/dynamic";
import React from "react";

const DirectContactInfo = dynamic(
  () => import("@/components/get-touch/direct-contact"),
  {
    ssr: false,
  }
);

async function GetInTouch({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const categoriesData = await getAllCategories(params.locale);

  const [RequestForm, getInTouchSectionDetails, getDirectContact, Categories] =
    await Promise.all([
      getRequestFormData({ locale }),
      getInTouchHeadingData({ locale }),
      getDirectContactData({ locale }),
      getAllCategories({ locale }),
    ]);

  return (
    <div>
      <TouchHeading data={getInTouchSectionDetails} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-[50px] lg:p-[60px] max-w-7xl mx-auto w-full">
        <MessageFormComponent />
        <QuoteFormComponent
          locale={locale}
          Categories={categoriesData?.categories}
          data={RequestForm}
        />
      </div>

      {/* <div className="bg-[#fff] md:pb-10">
        <DirectContactInfo data={getDirectContact} />
      </div> */}
    </div>
  );
}

export default GetInTouch;
