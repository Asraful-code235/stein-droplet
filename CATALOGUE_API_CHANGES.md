# Catalogue API Changes Documentation

## Overview
The catalogue structure has been completely redesigned to be more organized and meaningful. This document outlines all the changes and provides examples for frontend integration.

## 🔄 **Field Changes**

### **Old Structure** ❌
```json
{
  "title": "string",
  "slug": "uid",
  "file": "media",
  "products": "relation",
  "category": "relation", 
  "description": "string",
  "KeyFeatures": "component",
  "thumbnail": "media",
  "mainImage": "media",
  "sections": "component"
}
```

### **New Structure** ✅
```json
{
  "catalogueTitle": "string",
  "catalogueSlug": "uid",
  "catalogueImage": "media",
  "catalogueDescription": "text",
  "catalogueItems": [
    {
      "file": "media",
      "title": "string",
      "slug": "uid",
      "thumbnail": "media", 
      "keyFeatures": ["array"],
      "description": "text"
    }
  ]
}
```

## 📋 **Detailed Field Mapping**

| Old Field | New Field | Notes |
|-----------|-----------|-------|
| `title` | `catalogueTitle` | More descriptive name |
| `slug` | `catalogueSlug` | More descriptive name |
| `mainImage` | `catalogueImage` | More descriptive name |
| ❌ `file` | ➡️ `catalogueItems[].file` | Moved to items |
| ❌ `products` | **Removed** | No longer needed |
| ❌ `category` | **Removed** | No longer needed |
| ❌ `description` | ➡️ `catalogueDescription` | Back at root level |
| ❌ `KeyFeatures` | ➡️ `catalogueItems[].keyFeatures` | Moved to items |
| ❌ `thumbnail` | ➡️ `catalogueItems[].thumbnail` | Moved to items |
| `sections` | `catalogueItems` | More meaningful name |

## 🚀 **API Endpoints**

### **Get All Catalogues**
```http
GET /api/catalogues?locale=en&populate=*
```

### **Get Single Catalogue**
```http
GET /api/catalogues/{id}?locale=en&populate=*
```

## 📝 **API Response Example**

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "catalogueTitle": "Premium Stone Collection",
      "catalogueSlug": "premium-stone-collection",
      "catalogueDescription": "Our finest selection of natural stones for luxury projects",
      "catalogueImage": {
        "id": 1,
        "url": "/uploads/catalogue_main_image.jpg",
        "alternativeText": "Premium stones showcase",
        "width": 1200,
        "height": 800
      },
      "catalogueItems": [
        {
          "id": 1,
          "title": "Marble Collection",
          "slug": "marble-collection",
          "description": "Elegant marble stones for sophisticated interiors",
          "file": {
            "id": 2,
            "url": "/uploads/marble_catalogue.pdf",
            "name": "marble_catalogue.pdf"
          },
          "thumbnail": {
            "id": 3,
            "url": "/uploads/marble_thumb.jpg",
            "alternativeText": "Marble thumbnail"
          },
          "keyFeatures": [
            {
              "id": 1,
              "option": "Durable"
            },
            {
              "id": 2, 
              "option": "Heat Resistant"
            },
            {
              "id": 3,
              "option": "Easy to Clean"
            }
          ]
        },
        {
          "id": 2,
          "title": "Granite Collection", 
          "slug": "granite-collection",
          "description": "Strong granite stones for heavy-duty applications",
          "file": {
            "id": 4,
            "url": "/uploads/granite_catalogue.pdf",
            "name": "granite_catalogue.pdf"
          },
          "thumbnail": {
            "id": 5,
            "url": "/uploads/granite_thumb.jpg",
            "alternativeText": "Granite thumbnail"
          },
          "keyFeatures": [
            {
              "id": 4,
              "option": "Extremely Durable"
            },
            {
              "id": 5,
              "option": "Scratch Resistant"
            }
          ]
        }
      ]
    }
  ]
}
```

## 💻 **Frontend Integration Guide**

### **1. Fetch All Catalogues**
```typescript
const fetchCatalogues = async () => {
  const response = await fetch('/api/catalogues?locale=en&populate=*');
  const data = await response.json();
  return data.data; // Array of catalogues
};
```

### **2. Display Catalogue List**
```typescript
// Show catalogue cards
catalogues.map(catalogue => ({
  id: catalogue.id,
  title: catalogue.catalogueTitle,
  slug: catalogue.catalogueSlug,
  description: catalogue.catalogueDescription,
  image: catalogue.catalogueImage?.url,
  imageAlt: catalogue.catalogueImage?.alternativeText
}))
```

### **3. Show Catalogue Items (when catalogue is clicked)**
```typescript
// When user clicks on a catalogue, show its items
const showCatalogueItems = (catalogue) => {
  const items = catalogue.catalogueItems.map(item => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description,
    downloadUrl: item.file?.url,
    fileName: item.file?.name,
    thumbnail: item.thumbnail?.url,
    thumbnailAlt: item.thumbnail?.alternativeText,
    features: item.keyFeatures?.map(feature => feature.option) || []
  }));
  
  return items;
};
```

### **4. Complete Component Example**
```typescript
interface CatalogueItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  file?: { url: string; name: string };
  thumbnail?: { url: string; alternativeText: string };
  keyFeatures?: { option: string }[];
}

interface Catalogue {
  id: number;
  catalogueTitle: string;
  catalogueSlug: string;
  catalogueDescription: string;
  catalogueImage?: { url: string; alternativeText: string };
  catalogueItems: CatalogueItem[];
}

const CatalogueComponent = () => {
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [selectedCatalogue, setSelectedCatalogue] = useState<Catalogue | null>(null);

  // Fetch catalogues
  useEffect(() => {
    fetchCatalogues().then(setCatalogues);
  }, []);

  // Show catalogue list or items
  return (
    <div>
      {!selectedCatalogue ? (
        // Show catalogue list
        <div className="catalogue-grid">
          {catalogues.map(catalogue => (
            <div key={catalogue.id} onClick={() => setSelectedCatalogue(catalogue)}>
              <img src={catalogue.catalogueImage?.url} alt={catalogue.catalogueImage?.alternativeText} />
              <h3>{catalogue.catalogueTitle}</h3>
              <p>{catalogue.catalogueDescription}</p>
            </div>
          ))}
        </div>
      ) : (
        // Show catalogue items
        <div className="catalogue-items">
          <button onClick={() => setSelectedCatalogue(null)}>← Back to Catalogues</button>
          <h2>{selectedCatalogue.catalogueTitle}</h2>
          <p>{selectedCatalogue.catalogueDescription}</p>
          
          <div className="items-grid">
            {selectedCatalogue.catalogueItems.map(item => (
              <div key={item.id}>
                <img src={item.thumbnail?.url} alt={item.thumbnail?.alternativeText} />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <ul>
                  {item.keyFeatures?.map((feature, index) => (
                    <li key={index}>{feature.option}</li>
                  ))}
                </ul>
                {item.file && (
                  <a href={item.file.url} download={item.file.name}>
                    Download {item.file.name}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

## 🔧 **Migration Steps**

1. **Update API calls** to use new field names
2. **Update TypeScript interfaces** with new structure  
3. **Update component logic** to handle `catalogueItems` instead of separate fields
4. **Test the new flow**: Catalogue list → Catalogue items
5. **Update any existing data** in Strapi admin

## ✅ **Benefits of New Structure**

- **Cleaner organization**: All catalogue-specific fields are clearly named
- **Better UX**: Clear separation between catalogue overview and individual items
- **More flexible**: Each catalogue can have multiple items with their own files and features
- **Meaningful names**: `catalogueItems` is more descriptive than `sections`
- **Simplified API**: No more unnecessary relations to products/categories
