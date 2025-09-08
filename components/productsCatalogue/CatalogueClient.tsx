'use client';

import React from 'react';
import { useCatalogueByCategory, useCatalogueHeading } from '@/hooks/useApi';
import DynamicCatalogue from '@/components/productsCatalogue/DynamicCatalogue';
import ProductHeading from '@/components/productsCatalogue/ProductHeading';
import RefreshButton from '@/components/RefreshButton';

interface CatalogueClientProps {
  locale: string;
  slug: string;
}

export default function CatalogueClient({ locale, slug }: CatalogueClientProps) {
  const { data: headingData } = useCatalogueHeading(locale);
  const { data: catalogueItems } = useCatalogueByCategory(locale, slug);


  return (
    <>
      <ProductHeading data={headingData?.heading} />
      <DynamicCatalogue data={catalogueItems || []} />
    </>
  );
}


