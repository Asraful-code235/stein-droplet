import React from "react";

import ProductHeading from "@/components/productsCatalogue/ProductHeading";
import NaturalStonesCatalogue from "@/components/productsCatalogue/NaturalStonesCatalogue";
import PremiumTileCatalogue from "@/components/productsCatalogue/PremiumTileCatalogue";
import PremiumBricksCatalogue from "@/components/productsCatalogue/PremiumBricksCatalogue";
import { getCatalogueBySlug, getCatalogueHeadingData } from "@/lib/api";

export default async function Catalogue({ params: { slug, locale } }: any) {
  const naturalStones = await getCatalogueBySlug({
    locale: locale,
    category: "natural-stones",
  });

  const premiumCeramics = await getCatalogueBySlug({
    locale: locale,
    category: "premium-ceramics",
  });

  const premiumBricks = await getCatalogueBySlug({
    locale: locale,
    category: "premium-bricks",
  });

  const catalogueData = await getCatalogueHeadingData({
    locale: locale,
  });

  return (
    <>
      <ProductHeading data={catalogueData?.heading} />
      <NaturalStonesCatalogue data={naturalStones} />
      <PremiumTileCatalogue data={premiumCeramics} />
      <PremiumBricksCatalogue data={premiumBricks} />
    </>
  );
}
