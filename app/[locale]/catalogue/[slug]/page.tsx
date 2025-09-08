import React from "react";
export const dynamic = 'force-dynamic';
import HydratedPage from "@/components/HydratedPage";
import { prefetchCatalogueData } from "@/lib/server-query";
import CatalogueClient from "@/components/productsCatalogue/CatalogueClient";

export default async function ProductDetailsPage({
  params: { slug, locale },
}: any) {
  const dehydratedState = await prefetchCatalogueData(locale, slug);

  return (
    <HydratedPage dehydratedState={dehydratedState}>
      <CatalogueClient locale={locale} slug={slug} />
    </HydratedPage>
  );
}
