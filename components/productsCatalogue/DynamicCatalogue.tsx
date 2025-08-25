"use client";
import React, { useState } from "react";

interface CatalogueItem {
  id: number;
  title: string;
  description?: string;
  features: string[];
  image: string;
  fileUrl: string;
  slug: string;
  catalogueTitle: string;
  catalogueDescription: string;
}

interface DynamicCatalogueProps {
  data: CatalogueItem[];
  catalogueTitle?: string;
  catalogueDescription?: string;
}

const DynamicCatalogue = ({ data, catalogueTitle, catalogueDescription }: DynamicCatalogueProps) => {
  const [downloadingItems, setDownloadingItems] = useState<Set<number>>(new Set());

  const handleDownload = async (url: string, itemId: number) => {
    setDownloadingItems(prev => new Set(prev).add(itemId));
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          // Optional: you can pass auth headers if needed
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;

      const filename = url.split("/").pop() || "download.pdf";
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setDownloadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleView = (url: string) => {
    window.open(url, "_blank");
  };

  // Get title and description from the first item if not provided as props
  const displayTitle = catalogueTitle || data?.[0]?.catalogueTitle || "Catalogue";
  const displayDescription = catalogueDescription || data?.[0]?.catalogueDescription || "Browse our collection";

  // Extract the main title and subtitle from catalogueTitle
  const titleParts = displayTitle.split(' ');
  const mainTitle = titleParts.slice(0, -1).join(' '); // Everything except last word
  const subtitle = titleParts[titleParts.length - 1]; // Last word

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter text-[#101820] mb-6">
            {mainTitle}
            {subtitle && <span className="text-[#CB7856] ml-3">{subtitle}</span>}
          </h1>
          <p className="text-xl text-[#101820] font-sans max-w-3xl mx-auto">
            {displayDescription}
          </p>
        </div>
        
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.map((collection: CatalogueItem) => (
              <div
                key={collection.id}
                className="bg-[#fff] border-black border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="h-70 relative">
                  <div className="relative w-full h-[250px]">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="object-cover max-h-[270px] brightness-90 w-full"
                    />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h2
                      className="text-[20px] font-semibold font-inter mb-2 text-[#101820]"
                      style={{ letterSpacing: "-0.5px" }}
                    >
                      {collection.title}
                    </h2>

                    {collection.description && (
                      <p className="text-[14px] mb-4 font-inter text-[#101820]">
                        {collection.description}
                      </p>
                    )}

                    <h3 className="font-playfair text-[20px] font-semibold text-[#101820] mb-2">
                      Key Features:
                    </h3>
                    <ul className="text-gray-600 space-y-1 mb-6">
                      {collection.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2 text-[18px] text-yellowDark">
                            •
                          </span>
                          <span className="text-[#101820] text-[14px]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-3 justify-center items-center mt-auto">
                    <button
                      onClick={() => handleView(collection.fileUrl)}
                      className="flex items-center justify-center w-1/2 border border-[#CB7856] text-[#CB7856] rounded-md hover:bg-yellowDark/10 px-4 py-2 text-[14px] font-medium transition-colors gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View
                    </button>

                    <button
                      onClick={() => handleDownload(collection.fileUrl, collection.id)}
                      disabled={downloadingItems.has(collection.id)}
                      className="flex items-center justify-center w-1/2 border bg-[#CB7856] text-black font-inter text-[14px] hover:bg-[#CB7856] px-4 py-2 rounded-md font-medium transition-colors gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {downloadingItems.has(collection.id) ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          Download
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No catalogue items available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicCatalogue;
