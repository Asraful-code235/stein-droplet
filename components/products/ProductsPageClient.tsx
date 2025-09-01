'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useCategories,
  useProducts,
  useProductsByCategory,
  useThickness,
} from '@/hooks/useApi';
import Products from '@/components/products/index';

interface ProductsPageClientProps {
  locale: string;
}

export default function ProductsPageClient({ locale }: ProductsPageClientProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  // Use TanStack Query hooks for real-time data
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useCategories(locale);
  const { data: allProducts, isLoading: allProductsLoading, error: allProductsError } = useProducts(locale);
  const { data: categoryProducts, isLoading: categoryProductsLoading, error: categoryProductsError } = useProductsByCategory(locale, category || '');
  const { data: thickness, isLoading: thicknessLoading, error: thicknessError } = useThickness(locale);

  // Determine which products to use
  const products = category ? categoryProducts : allProducts;
  const productsLoading = category ? categoryProductsLoading : allProductsLoading;
  const productsError = category ? categoryProductsError : allProductsError;

  // Show loading state
  if (categoriesLoading || productsLoading || thicknessLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (categoriesError || productsError || thicknessError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg">Error loading products</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  console.log("🔄 Real-time products data:", products);

  return (
    <Products
      colors={[]} // You can add useColors hook if needed
      thickness={thickness || []}
      sizes={[]} // You can add useSizes hook if needed
      category={category}
      locale={locale}
      initialProducts={products || []}
    />
  );
}
