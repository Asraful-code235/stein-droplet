// app/[locale]/products/page.tsx
import Products from "@/components/products/index";
import {
  getProductsByCategorySlug,
  getAllProducts,
  getAllColors,
  getAllThickness,
  getAllSizes,
  getAllCategories,
} from "@/lib/api";
import { prefetchProductsData } from "@/lib/server-query";
import HydratedPage from "@/components/HydratedPage";

interface Props {
  searchParams: Record<string, string>;
  params: { locale: string };
}

export default async function ProductsPage({ searchParams, params }: Props) {
  const category = searchParams.category;

  // Prefetch all products data server-side
  const dehydratedState = await prefetchProductsData(params.locale, category);

  // Still fetch data for SSR (will be cached by TanStack Query)
  await getAllCategories(params.locale);

  const [colors, thickness, sizes] = await Promise.all([
    getAllColors({ locale: params.locale }),
    getAllThickness({ locale: params.locale }),
    getAllSizes({ locale: params.locale }),
  ]);

  const products = category
    ? await getProductsByCategorySlug({
        locale: params.locale,
        categorySlug: category,
      })
    : await getAllProducts({ locale: params.locale });

  return (
    <HydratedPage dehydratedState={dehydratedState}>
      <Products
        colors={colors}
        thickness={thickness}
        sizes={sizes}
        category={category}
        locale={params.locale}
        initialProducts={products}
      />
    </HydratedPage>
  );
}
