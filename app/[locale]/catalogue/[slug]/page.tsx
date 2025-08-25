import DynamicCatalogue from "@/components/productsCatalogue/DynamicCatalogue";
import ProductHeading from "@/components/productsCatalogue/ProductHeading";
import { getCatalogueBySlug, getCatalogueHeadingData } from "@/lib/api";
import React from "react";

export default async function ProductDetailsPage({
  params: { slug, locale },
}: any) {
  const catalogues = await getCatalogueBySlug({ locale, category: slug });
  const catalogueData = await getCatalogueHeadingData({ locale });

  return (
    <>
      <ProductHeading data={catalogueData?.heading} />
      <DynamicCatalogue data={catalogues} />
    </>
  );
}
