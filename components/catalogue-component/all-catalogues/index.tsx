"use client"
import React from "react";

import ProductHeading from "@/components/productsCatalogue/ProductHeading";
import NaturalStonesCatalogue from "@/components/productsCatalogue/NaturalStonesCatalogue";
import PremiumTileCatalogue from "@/components/productsCatalogue/PremiumTileCatalogue";
import PremiumBricksCatalogue from "@/components/productsCatalogue/PremiumBricksCatalogue";
import { getCatalogueBySlug, getCatalogueHeadingData, getCollectionData } from "@/lib/api";
import { useParams } from "next/navigation";

export default async function Catalogue() {
  const params = useParams();
  const option = params?.slug;

  const naturalStones = await getCatalogueBySlug({
    locale: params.locale,
    category: "natural-stones",
  });

  const premiumCeramics = await getCatalogueBySlug({
    locale: params.locale,
    category: "premium-ceramics",
  });

  const premiumBricks = await getCatalogueBySlug({
    locale: params.locale,
    category: "premium-bricks",
  });

   const catalogueData = await getCatalogueHeadingData({
    locale: params.locale,
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
