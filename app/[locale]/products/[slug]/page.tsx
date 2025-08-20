import dynamic from "next/dynamic";
import React from "react";

const ProductDetailsComponent = dynamic(
  () => import("@/components/products/ProductDetails"),
  {
    ssr: false,
  }
)
export default function ProductDetailsPage() {
  return (
    <div>
      <ProductDetailsComponent />
    </div>
  );
}
