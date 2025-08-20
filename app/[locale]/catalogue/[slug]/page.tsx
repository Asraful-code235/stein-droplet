import NaturalStonesCatalogue from "@/components/productsCatalogue/NaturalStonesCatalogue";
import PremiumBricksCatalogue from "@/components/productsCatalogue/PremiumBricksCatalogue";
import PremiumTileCatalogue from "@/components/productsCatalogue/PremiumTileCatalogue";
import ProductHeading from "@/components/productsCatalogue/ProductHeading";
import { getCatalogueBySlug, getCatalogueHeadingData } from "@/lib/api";
import React from "react";

export default async function ProductDetailsPage({
  params: { slug, locale },
}: any) {
  const catalogues = await getCatalogueBySlug({ locale, category: slug });
  const catalogueData = await getCatalogueHeadingData({ locale })
  return (
    <>
      <ProductHeading data={catalogueData?.heading} />
      {slug === "natural-stones" && (
        <NaturalStonesCatalogue data={catalogues} />
      )}
      {slug === "premium-ceramics" && (
        <PremiumBricksCatalogue data={catalogues} />
      )}
      {slug === "architectual-bricks" && (
        <PremiumTileCatalogue data={catalogues} />
      )}
    </>
  );
}
