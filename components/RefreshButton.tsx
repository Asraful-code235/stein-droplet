'use client';

import React, { useState } from 'react';
import { useManualRefresh } from '@/hooks/useApi';

interface RefreshButtonProps {
  locale: string;
  type?: 'products' | 'categories' | 'projects' | 'catalogues' | 'catalogue-category' | 'all';
  categorySlug?: string;
  className?: string;
}

export default function RefreshButton({ 
  locale, 
  type = 'all', 
  categorySlug,
  className = '' 
}: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { refreshProducts, refreshCategories, refreshProjects, refreshAll, refreshCatalogues, refreshCatalogueCategory } = useManualRefresh();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      switch (type) {
        case 'products':
          refreshProducts(locale);
          break;
        case 'categories':
          refreshCategories(locale);
          break;
        case 'projects':
          refreshProjects(locale);
          break;
        case 'catalogues':
          refreshCatalogues(locale);
          break;
        case 'catalogue-category':
          if (categorySlug) {
            refreshCatalogueCategory(locale, categorySlug);
          }
          break;
        case 'all':
        default:
          refreshAll(locale);
          break;
      }
      
      // Show feedback for 1 second
      setTimeout(() => setIsRefreshing(false), 1000);
    } catch (error) {
      console.error('Refresh failed:', error);
      setIsRefreshing(false);
    }
  };

  const getButtonText = () => {
    if (isRefreshing) return 'Refreshing...';
    
    switch (type) {
      case 'products': return 'Refresh Products';
      case 'categories': return 'Refresh Categories';
      case 'projects': return 'Refresh Projects';
      case 'catalogues': return 'Refresh Catalogues';
      case 'catalogue-category': return 'Refresh This Catalogue';
      case 'all':
      default: return 'Refresh All Data';
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`
        px-4 py-2 rounded-md font-medium transition-all duration-200
        ${isRefreshing 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
        }
        text-white shadow-sm hover:shadow-md
        ${className}
      `}
    >
      {isRefreshing && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {getButtonText()}
    </button>
  );
}

// Usage examples:
// <RefreshButton locale="en" type="products" />
// <RefreshButton locale="en" type="all" className="ml-4" />
