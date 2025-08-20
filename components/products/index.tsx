"use client";
import { IconType } from "react-icons";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { SlidersHorizontal } from "lucide-react";
import collections from "@/assets/Collection1.png";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getFilteredProducts } from "@/lib/api";

interface Product {
  id: string;
  name: string;
  code?: string;
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
const SlidersHorizonta: any = SlidersHorizontal;
const Products = ({
  locale,
  category,
  initialProducts,
  thickness = [],
  sizes = [],
  colors = [],
}: ProductsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    Collection: searchParams.getAll("collection") || [],
    Colors: searchParams.getAll("colors") || [],
    Thickness: searchParams.getAll("thickness") || [],
    Sizes: searchParams.getAll("sizes") || [],
  });

  const filters = [
    { name: "Colors", options: colors.map((c) => c.value) },
    { name: "Thickness", options: thickness.map((t) => t.value) },
    { name: "Sizes", options: sizes.map((s) => s.value) },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const createQueryString = useCallback((filters: FilterState) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, values]) => {
      params.delete(key.toLowerCase());

      values.forEach((value: any) => {
        if (value.toLowerCase() !== "all") {
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
      combinedQuery.set("category", category);
    }

    router.replace(`${pathname}?${combinedQuery.toString()}`, {
      scroll: false,
    });
  }, [selectedFilters, createQueryString, pathname, router, category]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getFilteredProducts({
        locale,
        selectedFilters,
        category: category || null,
      });
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [selectedFilters, category]);

  const toggleFilter = (name: string) => {
    setActiveFilter(activeFilter === name ? null : name);
  };

  const handleFilterChange = (name: keyof FilterState, option: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };

      if (name === "Collection" && option === "All") {
        newFilters[name] = ["All"];
      } else {
        const currentValues = newFilters[name];
        newFilters[name] = currentValues.includes(option)
          ? currentValues.filter((v) => v !== option)
          : [...currentValues, option];

        if (
          name === "Collection" &&
          option !== "All" &&
          currentValues.includes("All")
        ) {
          newFilters[name] = newFilters[name].filter((v) => v !== "All");
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

    router.push(`/${locale}/products`, { scroll: false });
  };

  return (
    <div className="bg-white px-4 md:px-6 py-4 md:py-20">
      <div className="max-w-7xl mx-auto">
        {isMobile && (
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="mb-4 flex items-center gap-2 border border-[#CFBBA4] text-[#CFBBA4] px-3 py-1 rounded"
          >
            <SlidersHorizonta size={16} />
            Filters
          </button>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div
            className={`lg:w-1/4 bg-[#D4C0A8] lg:rounded-xl ${
              isMobile
                ? `fixed top-0 right-0 h-full w-[80%] z-50 transition-transform ${
                    mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
                  }`
                : "sticky top-28"
            }`}
          >
            {isMobile && (
              <div className="flex justify-between items-center p-4 border-b border-[#CB7856]">
                <h3 className="font-bold">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-2xl"
                >
                  ×
                </button>
              </div>
            )}

            <div className="p-4">
              {filters.map((filter) => (
                <div key={filter.name} className="mb-6">
                  <button
                    onClick={() => toggleFilter(filter.name)}
                    className="w-full flex justify-between items-center pb-2 border-b-2 border-[#CB7856]"
                  >
                    <span>{filter.name}</span>
                    {activeFilter === filter.name ? (
                      <ArrowUp className="text-[#CB7856]" size={16} />
                    ) : (
                      <ArrowDown className="text-[#CB7856]" size={16} />
                    )}
                  </button>
                  {activeFilter === filter.name && (
                    <div className="mt-3 space-y-2 pl-2">
                      {filter.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedFilters[
                              filter.name as keyof FilterState
                            ].includes(option)}
                            onChange={() =>
                              handleFilterChange(
                                filter.name as keyof FilterState,
                                option
                              )
                            }
                            className="rounded"
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
                className="w-full mt-4 text-[#CB7856] hover:underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          </div>

          <div className="flex-1">
            {loading ? (
              <p className="text-center py-12">Loading products...</p>
            ) : products?.length === 0 ? (
              <div className="text-center py-12">
                <p>No products match your filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-2 text-[#CB7856] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products?.map((product: any) => (
                  <div
                    onClick={() => {
                      router.push(`/products/${product.id}`);
                    }}
                    key={product.id}
                    className="bg-white hover:cursor-pointer rounded-lg shadow overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="h-[300px] bg-gray-200 relative">
                      <img
                        src={
                          product?.backgroundImage?.[0]?.formats?.medium?.url
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${product.backgroundImage[0].formats.medium.url}`
                            : ""
                        }
                        alt={product?.name || "Product image"}
                        className="object-cover w-full h-full"
                      />
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
