'use client';
import { IconType } from 'react-icons';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';
import { SlidersHorizontal } from 'lucide-react';
import collections from '@/assets/Collection1.png';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image: string | null;
  gallery: Array<{
    url: string | null;
    alternativeText: string;
    width?: number;
    height?: number;
  }>;
  category?: string;
  categorySlug?: string;
  variations?: {
    label: string;
    values: Array<{ value: string } | string>;
  }[];
}

interface FilterState {
  Collection: string[];
  Colors: string[];
  Thickness: string[];
  Sizes: string[];
}
interface ProductsProps {
  locale: any;
  initialProducts: Product[];
  thickness: { id: number; value: string }[];
  sizes: { id: number; value: string }[];
  colors: { id: number; value: string }[];
  category: any;
}

const ArrowUp: any = FaArrowUpLong;
const ArrowDown: any = FaArrowDownLong;
const SlidersHorizontalIcon: any = SlidersHorizontal;
const Products = ({
  locale,
  category,
  initialProducts,
  thickness = [],
  sizes = [],
  colors = [],
}: ProductsProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasFiltersChanged, setHasFiltersChanged] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    Collection: searchParams.getAll('collection') || [],
    Colors: searchParams.getAll('colors') || [],
    Thickness: searchParams.getAll('thickness') || [],
    Sizes: searchParams.getAll('sizes') || [],
  });

  const filters = [
    { name: t('filters.colors'), options: colors.map((c) => c.value) },
    { name: t('filters.thickness'), options: thickness.map((t) => t.value) },
    { name: t('filters.sizes'), options: sizes.map((s) => s.value) },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const createQueryString = useCallback((filters: FilterState) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, values]) => {
      params.delete(key.toLowerCase());

      values.forEach((value: any) => {
        if (value.toLowerCase() !== 'all') {
          params.append(key.toLowerCase(), value);
        }
      });
    });

    return params.toString();
  }, []);
  useEffect(() => {
    const queryString = createQueryString(selectedFilters);

    const combinedQuery = new URLSearchParams(queryString);
    if (category) {
      combinedQuery.set('category', category);
    }

    router.replace(`${pathname}?${combinedQuery.toString()}`, {
      scroll: false,
    });
  }, [selectedFilters, createQueryString, pathname, router, category]);

  // Update products when initialProducts change (e.g., category change from server)
  useEffect(() => {
    if (!hasFiltersChanged) {
      setProducts(initialProducts);
    }
  }, [initialProducts, hasFiltersChanged]);

  // Frontend filtering when filters change
  useEffect(() => {
    // Check if any filters are actually applied
    const hasActiveFilters = Object.values(selectedFilters).some(filterArray => filterArray.length > 0);

    if (hasActiveFilters) {
      setLoading(true);
      setHasFiltersChanged(true);

      // Filter products on the frontend
      const filteredProducts = initialProducts.filter((product: Product) => {
        // variations is an object, not an array - cast to any to access properties
        const variations = product.variations as any;

        // Check colors filter
        if (selectedFilters.Colors.length > 0) {
          const productColors: string[] = [];

          // Extract colors from variations object
          if (variations && Array.isArray(variations.colors)) {
            variations.colors.forEach((c: any) => {
              if (c.value) productColors.push(c.value);
              if (c.name) productColors.push(c.name);
            });
          }


          const hasMatchingColor = selectedFilters.Colors.some(color =>
            productColors.includes(color)
          );


          if (!hasMatchingColor) return false;
        }

        // Check sizes filter
        if (selectedFilters.Sizes.length > 0) {
          const productSizes: string[] = [];

          // Extract sizes from variations object
          if (variations && Array.isArray(variations.sizes)) {
            variations.sizes.forEach((s: any) => {
              if (s.value) productSizes.push(s.value);
              if (s.size) productSizes.push(s.size);
              // Handle nested sizes array
              if (Array.isArray(s.sizes)) {
                s.sizes.forEach((size: any) => {
                  if (size.size) productSizes.push(size.size);
                  if (size.value) productSizes.push(size.value);
                });
              }
            });
          }


          const hasMatchingSize = selectedFilters.Sizes.some(size =>
            productSizes.includes(size)
          );

          if (!hasMatchingSize) return false;
        }

        // Check thickness filter
        if (selectedFilters.Thickness.length > 0) {
          const productThicknesses: string[] = [];

          // Extract thicknesses from variations object
          if (variations && Array.isArray(variations.thicknesses)) {
            variations.thicknesses.forEach((t: any) => {
              if (t.value) productThicknesses.push(t.value);
            });
          }


          const hasMatchingThickness = selectedFilters.Thickness.some(thickness =>
            productThicknesses.includes(thickness)
          );

          if (!hasMatchingThickness) return false;
        }

        return true;
      });


      setProducts(filteredProducts);
      setLoading(false);
    } else if (hasFiltersChanged) {
      // Reset to initial products when no filters are applied
      setProducts(initialProducts);
      setHasFiltersChanged(false);
    }
  }, [selectedFilters, initialProducts, hasFiltersChanged]);

  const toggleFilter = (name: string) => {
    setActiveFilter(activeFilter === name ? null : name);
  };

  const handleFilterChange = (name: keyof FilterState, option: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };

      if (name === 'Collection' && option === 'All') {
        newFilters[name] = ['All'];
      } else {
        const currentValues = newFilters[name];
        newFilters[name] = currentValues.includes(option)
          ? currentValues.filter((v) => v !== option)
          : [...currentValues, option];

        if (
          name === 'Collection' &&
          option !== 'All' &&
          currentValues.includes('All')
        ) {
          newFilters[name] = newFilters[name].filter((v) => v !== 'All');
        }
      }

      return newFilters;
    });
  };



  const clearAllFilters = () => {
    setSelectedFilters({
      Collection: [],
      Colors: [],
      Thickness: [],
      Sizes: [],
    });
    setHasFiltersChanged(false);

    router.push(`/${locale}/products`, { scroll: false });
  };


  return (
    <div className='bg-white px-4 md:px-6 py-4 md:py-20'>
      <div className='max-w-7xl mx-auto'>
        {isMobile && (
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className='mb-4 flex items-center gap-2 border border-[#CFBBA4] text-[#CFBBA4] px-3 py-1 rounded'
          >
            <SlidersHorizontalIcon size={16} />
            {t('filters.filters')}
          </button>
        )}

        <div className='flex flex-col lg:flex-row gap-6'>
          <div
            className={`lg:w-1/4 bg-[#D4C0A8] lg:rounded-xl ${
              isMobile
                ? `fixed top-0 right-0 max-h-[400px] overflow-y-scroll w-[80%] z-50 transition-transform ${
                    mobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'
                  }`
                : 'sticky top-28'
            }`}
          >
            {isMobile && (
              <div className='flex justify-between items-center p-4 border-b border-[#CB7856]'>
                <h3 className='font-bold'>{t('filters.filters')}</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className='text-2xl'
                >
                  ×
                </button>
              </div>
            )}

            <div className='p-4'>
              {filters.map((filter) => (
                <div key={filter.name} className='mb-6'>
                  <button
                    onClick={() => toggleFilter(filter.name)}
                    className='w-full flex justify-between items-center pb-2 border-b-2 border-[#CB7856]'
                  >
                    <span>{filter.name}</span>
                    {activeFilter === filter.name ? (
                      <ArrowUp className='text-[#CB7856]' size={16} />
                    ) : (
                      <ArrowDown className='text-[#CB7856]' size={16} />
                    )}
                  </button>
                  {activeFilter === filter.name && (
                    <div className='mt-3 space-y-2 pl-2'>
                      {filter.options.map((option) => (
                        <label
                          key={option}
                          className='flex items-center gap-2 cursor-pointer'
                        >
                          <input
                            type='checkbox'
                            checked={selectedFilters[
                              filter.name as keyof FilterState
                            ].includes(option)}
                            onChange={() =>
                              handleFilterChange(
                                filter.name as keyof FilterState,
                                option
                              )
                            }
                            className='rounded'
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={clearAllFilters}
                className='w-full mt-4 text-[#CB7856] hover:underline text-sm'
              >
                {t('filters.clearAllFilters')}
              </button>
            </div>
          </div>

          <div className='flex-1'>
            {loading ? (
              <p className='text-center py-12'>{t('common.loadingProducts')}</p>
            ) : !products || products.length === 0 ? (
              <div className='text-center py-12'>
                <p>{t('filters.noProductsFound')}</p>
                <button
                  onClick={clearAllFilters}
                  className='mt-2 text-[#CB7856] hover:underline'
                >
                  {t('filters.clearAllFilters')}
                </button>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className='bg-white hover:cursor-pointer rounded-lg shadow overflow-hidden hover:shadow-lg transition'
                  >
                    <div className='h-[300px] bg-gray-200 relative'>
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className='object-cover'
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          priority
                        />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center bg-gray-100'>
                          <span className='text-gray-400'>No image</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
