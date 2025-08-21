"use client";
import React from "react";
import Products from "@/components/products/index";
import {
  getProductsByCategorySlug,
  getAllProducts,
  getAllColors,
  getAllThickness,
  getAllSizes,
} from "@/lib/api";
import { useParams, useSearchParams } from "next/navigation";

async function ProductsPageComponent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const category = searchParams.get("category");

  // Ensure locale is a string
  const locale = Array.isArray(params.locale) ? params.locale[0] : params.locale;

  const colors = await getAllColors({ locale });
  const thicknesses = await getAllThickness({ locale });

  const sizes = await getAllSizes({ locale });
  let products;
  if (category) {
    products = await getProductsByCategorySlug({
      locale,
      categorySlug: category,
    });
  } else {
    products = await getAllProducts({ locale });
  }

  return (
    <Products
      colors={colors}
      category={category}
      locale={locale}
      sizes={sizes}
      thickness={thicknesses}
      initialProducts={products}
    />
  );
}

export default ProductsPageComponent;
