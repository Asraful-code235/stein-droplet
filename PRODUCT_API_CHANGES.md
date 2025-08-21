# API Changes: Products, Categories, and Catalogues

## Overview
This document outlines the recent changes made to the Product, Category, and Catalogue APIs, including updates to data structures and endpoints.

## 1. Product API Changes

### Auto-generated Slug
- The `slug` field is now automatically generated from the `name` field
- No need to manually provide a slug when creating/updating products
- Slugs are URL-friendly and unique

### New Relations
- Added `categories`: Many-to-many relation with Category
- Added `catalogues`: Many-to-many relation with Catalogue

### New Image Fields
- Added `mainImage`: A single required image field for the primary product image
  - Type: Media (single image)
  - Required: Yes
  - Allowed types: Images only

- Added `gallery`: An optional array of additional product images
  - Type: Media (multiple images)
  - Required: No
  - Allowed types: Images only

### Updated API Response

#### Product Object Structure
```typescript
{
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string;
    price: number;
    mainImage: {
      data: {
        id: number;
        attributes: {
          url: string;
          // ... other media attributes
        };
      };
    };
    gallery: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          // ... other media attributes
        };
      }>;
    };
    categories: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
    catalogues: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
    variations: {
      // ... variations structure
    };
  };
}
```

## 2. Category API Updates

### Endpoints
- `GET /api/categories` - List all categories with their products
- `GET /api/categories/:id` - Get a single category with its products

### Response Includes
- All category fields
- Products with complete data including:
  - Main image
  - Gallery images
  - Variations with all nested relations
  - Prices and other product details

## 3. Catalogue API Updates

### Endpoints
- `GET /api/catalogues` - List all catalogues with their products
- `GET /api/catalogues/:id` - Get a single catalogue with its products

### Response Includes
- All catalogue fields
- Products with complete data including:
  - Main image
  - Gallery images
  - Variations with all nested relations
  - Prices and other product details
- Category information
- Key features
- Thumbnail and file attachments

## Example Requests/Responses

### Create/Update Product
```http
POST /api/products
Content-Type: application/json

{
  "name": "Example Product",
  "description": "Product description",
  "price": 9999,
  "mainImage": 1, // ID of uploaded media
  "gallery": [2, 3, 4], // Array of media IDs
  "categories": [1, 2], // Array of category IDs
  "catalogues": [1, 3] // Array of catalogue IDs
}
```

### Get Category with Products
```http
GET /api/categories/1?populate=*
```

### Get Catalogue with Products
```http
GET /api/catalogues/1?populate=*
```

## Migration Notes
- Existing products will need to be updated to include the new required `mainImage` field
- The `slug` field is now managed automatically
- Products can now belong to multiple categories and catalogues

## Frontend Updates Required
1. Update product forms to include:
   - `mainImage` field (required)
   - `gallery` field for multiple images
   - Multi-select for `categories` and `catalogues`
2. Update any filters or queries that previously used the single `category` field
3. The `slug` field is now read-only and managed by the backend
4. Update product display components to handle the new image structure
5. Update category/catalogue pages to display product images and details
