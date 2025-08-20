"use client";
import { useParams } from "next/navigation";
import React from "react";

import ProductHeading from "../../components/productsCatalogue/ProductHeading";
import NaturalStonesCatalogue from "../../components/productsCatalogue/NaturalStonesCatalogue";
import PremiumTileCatalogue from "../../components/productsCatalogue/PremiumTileCatalogue";
import PremiumBricksCatalogue from "../../components/productsCatalogue/PremiumBricksCatalogue";
import { getCatalogueBySlug, getCatalogueHeadingData } from "@/lib/api";

export default async function CatalogueComponent({}) {
  const params = useParams();
  const option = params?.slug;
  const locale = params?.locale;
  const catalogues = await getCatalogueBySlug({
    locale: locale,
    category: option,
  });
  const catalogueData = await getCatalogueHeadingData({
    locale: params.locale,
  });


  return (
    <>
      <ProductHeading data={catalogueData?.heading} />
      {option == "natural-stones" && (
        <NaturalStonesCatalogue data={catalogues} />
      )}
      {option == "premium-ceramics" && (
        <PremiumBricksCatalogue data={catalogues} />
      )}
      {option == "premium-bricks" && <PremiumTileCatalogue data={catalogues} />}
    </>
  );
}
