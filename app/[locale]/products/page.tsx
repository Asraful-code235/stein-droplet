// app/[locale]/products/page.tsx
import ProductsGrid from "@/components/home/ProductsGrid";
import Products from "@/components/products/index";
import {
  getProductsByCategorySlug,
  getAllProducts,
  getAllColors,
  getAllThickness,
  getAllSizes,
  getAllCategories,
} from "@/lib/api";

interface Props {
  searchParams: Record<string, string>;
  params: { locale: string };
}

export default async function ProductsPage({ searchParams, params }: Props) {
  const category = searchParams.category;

  const categoriesData = await getAllCategories(params.locale);

  const { categories } = categoriesData;

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


  // Log the first product's structure to understand the data
  if (products.length > 0) {
    console.log("First product structure:", JSON.stringify(products[0], null, 2));
  }


  return (
    <Products
      colors={colors}
      thickness={thickness}
      sizes={sizes}
      category={category}
      locale={params.locale}
      initialProducts={products}
    />

  );
}
