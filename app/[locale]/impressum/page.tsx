import { getImpressumData } from "@/lib/api";
import React from "react";

const Impressum = async ({ params }: any) => {
  const ImpressumData = await getImpressumData({
    locale: params?.locale,
  });
  return (
    <div className="min-h-screen bg-[rgb(203,120,86)] text-white px-6 py-12 flex items-center justify-center">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl max-w-3xl w-full shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Legal Notice</h1>
        {ImpressumData?.data?.address ? (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Information according to § 5 TMG
            </h2>
            <p className="leading-relaxed">{ImpressumData?.data?.address}</p>
          </section>
        ) : (
          <></>
        )}

        {ImpressumData?.data?.representedBy ? (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Represented by</h2>
            <p>{ImpressumData?.data?.representedBy}</p>
          </section>
        ) : (
          <></>
        )}

        {ImpressumData?.data?.impressumContactDetails.length > 0 ? (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Contact</h2>

            {ImpressumData?.data?.impressumContactDetails?.map(
              (v: any, i: any) => (
                <>
                  <p>
                    {v?.title}: {v?.value}
                  </p>
                </>
              )
            )}
          </section>
        ) : (
          <></>
        )}
        {ImpressumData?.data?.vatId ? (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">VAT ID</h2>
            <p>{ImpressumData?.data?.vatId}</p>
          </section>
        ) : (
          <></>
        )}

        {ImpressumData?.data?.liableForcContent &&
        ImpressumData?.data?.liableForLinks ? (
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              Liability for content
            </h2>
            <p className="mb-4">{ImpressumData?.data?.liableForcContent} </p>
            <h2 className="text-2xl font-semibold mb-2">Liability for links</h2>
            <p>{ImpressumData?.data?.liableForLinks}</p>
          </section>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Impressum;
