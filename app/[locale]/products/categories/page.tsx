// app/[locale]/products/page.tsx
import ProductsGrid from "@/components/home/ProductsGrid";
import Products from "@/components/products/index";
import { getAllCategories } from "@/lib/api";
import Vision from "@/components/home/Vision";

interface Props {
  searchParams: Record<string, string>;
  params: { locale: string };
}

export default async function ProductsPage({ searchParams, params }: Props) {
  const categoriesData = await getAllCategories(params.locale);
  const { categories, details } = categoriesData;

  return (
    <div>
      {details?.premiumDetails && (
        <Vision details={details} data={categories} />
      )}
      {/* other components here */}
    </div>
  );
}
