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

  const colors = await getAllColors({ locale: params.locale });
  const thicknesses = await getAllThickness({ locale: params.locale });

  const sizes = await getAllSizes({ locale: params.locale });
  let products;
  if (category) {
    products = await getProductsByCategorySlug({
      locale: params.locale,
      categorySlug: category,
    });
  } else {
    products = await getAllProducts({ locale: params.locale });
  }

  return (
    <Products
      colors={colors}
      category={category}
      locale={params?.locale}
      sizes={sizes}
      thickness={thicknesses}
      initialProducts={products}
    />
  );
}

export default ProductsPageComponent;
