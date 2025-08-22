# Our Story Page - Backend Requirements for Strapi 5.13.0

## Overview
I've created a beautiful "Our Story" page for your premium materials website. The page includes:
- **Hero Section**: Full-screen background with compelling headline
- **Rich Content Section**: Detailed story with rich text and images
- **Company Showcase**: Image gallery, team section, and company values

## 🎯 Page Structure
The page is accessible at `/[locale]/our-story` and includes:
1. **StoryHero**: Full-screen hero with background image and title
2. **StoryContent**: Rich text content with side image and statistics
3. **CompanyShowcase**: Image gallery, team section, and values

## 📋 Backend Requirements for Strapi

### Option 1: Add to Pages (Recommended)
Add a new section component to your existing pages structure.

#### Create Component: `story.our-story`
**Location:** Components → Story → Our Story

```json
{
  "displayName": "Our Story",
  "category": "story",
  "attributes": {
    "hero": {
      "type": "component",
      "component": "story.hero",
      "required": true
    },
    "content": {
      "type": "component", 
      "component": "story.content",
      "required": true
    },
    "showcase": {
      "type": "component",
      "component": "story.showcase",
      "required": true
    }
  }
}
```

#### Create Component: `story.hero`
**Location:** Components → Story → Hero

```json
{
  "displayName": "Story Hero",
  "category": "story",
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "subTitle": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "richtext",
      "required": true
    },
    "backgroundImage": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "backgroundImageAlt": {
      "type": "string",
      "required": false
    }
  }
}
```

#### Create Component: `story.content`
**Location:** Components → Story → Content

```json
{
  "displayName": "Story Content",
  "category": "story",
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "richContent": {
      "type": "richtext",
      "required": true
    },
    "sideImage": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "sideImageAlt": {
      "type": "string",
      "required": false
    },
    "layout": {
      "type": "enumeration",
      "enum": ["text-left", "text-right", "text-center"],
      "default": "text-left"
    }
  }
}
```

#### Create Component: `story.showcase`
**Location:** Components → Story → Showcase

```json
{
  "displayName": "Story Showcase",
  "category": "story",
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text",
      "required": true
    },
    "images": {
      "type": "component",
      "component": "story.showcase-image",
      "repeatable": true,
      "required": false
    },
    "teamSection": {
      "type": "component",
      "component": "story.team-section",
      "required": true
    }
  }
}
```

#### Create Component: `story.showcase-image`
**Location:** Components → Story → Showcase Image

```json
{
  "displayName": "Showcase Image",
  "category": "story",
  "attributes": {
    "url": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "alt": {
      "type": "string",
      "required": true
    },
    "caption": {
      "type": "string",
      "required": false
    }
  }
}
```

#### Create Component: `story.team-section`
**Location:** Components → Story → Team Section

```json
{
  "displayName": "Team Section",
  "category": "story",
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text",
      "required": true
    },
    "teamImage": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "teamImageAlt": {
      "type": "string",
      "required": false
    }
  }
}
```

### Option 2: Dedicated Collection Type (Alternative)
If you prefer a separate collection for the story page.

#### Create Collection Type: `our-story`
**Location:** Collection Types → Our Story

```json
{
  "displayName": "Our Story",
  "singularName": "our-story",
  "pluralName": "our-stories",
  "attributes": {
    "hero": {
      "type": "component",
      "component": "story.hero",
      "required": true
    },
    "content": {
      "type": "component",
      "component": "story.content", 
      "required": true
    },
    "showcase": {
      "type": "component",
      "component": "story.showcase",
      "required": true
    }
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  }
}
```

## 🎨 Content Examples

### Hero Section Content:
- **Title**: "Crafting Spaces with"
- **SubTitle**: "Premium Materials"
- **Description**: "For over two decades, we have been dedicated to sourcing and providing the finest natural stones, premium ceramics, and architectural bricks..."
- **Background Image**: High-quality image of your materials or workspace

### Content Section:
- **Title**: "Our Journey"
- **Rich Content**: Your company story with HTML formatting, including headings, paragraphs, blockquotes
- **Side Image**: Image of craftsman, materials, or your facility

### Showcase Section:
- **Title**: "Behind the Scenes"
- **Description**: "Take a glimpse into our world..."
- **Images**: 4 images of your facility, quality control, materials, packaging
- **Team Section**: Team photo with description

## 🚀 Implementation Steps

1. **Create Components** in Strapi admin in this order:
   - `story.hero`
   - `story.content`
   - `story.showcase-image`
   - `story.team-section`
   - `story.showcase`
   - `story.our-story`

2. **Add to Pages** (Option 1):
   - Go to Content Manager → Pages
   - Edit your main page
   - Add `story.our-story` section to Sections field

3. **OR Create Collection** (Option 2):
   - Create `our-story` collection type
   - Add content entry

4. **Add Content**:
   - Fill in all the text content
   - Upload high-quality images
   - Publish the content

## ✅ Frontend Integration

The frontend is already prepared and will work automatically once you set up the backend. The page includes:
- ✅ **Responsive design** for all devices
- ✅ **Fallback content** when backend data is not available
- ✅ **Beautiful animations** and hover effects
- ✅ **SEO-friendly** structure
- ✅ **Accessible** components

## 🔗 Navigation

The "Discover Our Story" button on your homepage now links to `/our-story` and will work immediately once the backend is set up.

## 📞 Support

If you need help setting up any of these components in Strapi, let me know and I can provide more detailed step-by-step instructions!
