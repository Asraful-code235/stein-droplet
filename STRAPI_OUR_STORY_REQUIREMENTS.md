# Our Story Page - Strapi Backend Requirements

## Overview
Complete backend setup for the Our Story page with i18n support for English (en) and German (de).

## 🌐 Internationalization Setup
The API calls include locale parameter and expect translated content for:
- **English (en)**
- **German (de)**

## 📋 Required Components in Strapi

### 1. Component: `story.hero`
**Path:** Components → Story → Hero

```json
{
  "displayName": "Story Hero",
  "category": "story",
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "subTitle": {
      "type": "string", 
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "description": {
      "type": "richtext",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "backgroundImage": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"],
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "backgroundImageAlt": {
      "type": "string",
      "required": false,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    }
  }
}
```

### 2. Component: `story.content`
**Path:** Components → Story → Content

```json
{
  "displayName": "Story Content",
  "category": "story",
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "richContent": {
      "type": "richtext",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "sideImage": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"],
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "sideImageAlt": {
      "type": "string",
      "required": false,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "layout": {
      "type": "enumeration",
      "enum": ["text-left", "text-right", "text-center"],
      "default": "text-left"
    }
  }
}
```

### 3. Component: `story.showcase-image`
**Path:** Components → Story → Showcase Image

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
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "caption": {
      "type": "string",
      "required": false,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    }
  }
}
```

### 4. Component: `story.team-section`
**Path:** Components → Story → Team Section

```json
{
  "displayName": "Team Section",
  "category": "story",
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "description": {
      "type": "text",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "teamImage": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"],
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "teamImageAlt": {
      "type": "string",
      "required": false,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    }
  }
}
```

### 5. Component: `story.showcase`
**Path:** Components → Story → Showcase

```json
{
  "displayName": "Story Showcase",
  "category": "story",
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "description": {
      "type": "text",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
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

### 6. Component: `story.our-story`
**Path:** Components → Story → Our Story

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

## 🔧 Implementation Steps

### Step 1: Create Components (in order)
1. Create `story.hero`
2. Create `story.content`
3. Create `story.showcase-image`
4. Create `story.team-section`
5. Create `story.showcase`
6. Create `story.our-story`

### Step 2: Add to Pages
1. Go to **Content Manager → Pages**
2. Edit your main page
3. In the **Sections** field, add a new section
4. Select **story.our-story** component
5. Fill in the content for both **English** and **German**

### Step 3: Content Structure
The API expects this structure:
```json
{
  "__component": "story.our-story",
  "hero": {
    "title": "Crafting Spaces with",
    "subTitle": "Premium Materials",
    "description": "For over two decades...",
    "backgroundImage": { "url": "/uploads/hero-bg.jpg" },
    "backgroundImageAlt": "Premium materials showcase"
  },
  "content": {
    "title": "Our Journey",
    "richContent": "<p>Founded in 2001...</p>",
    "sideImage": { "url": "/uploads/story-side.jpg" },
    "sideImageAlt": "Craftsman working",
    "layout": "text-left"
  },
  "showcase": {
    "title": "Behind the Scenes",
    "description": "Take a glimpse into our world...",
    "images": [
      {
        "url": { "url": "/uploads/facility.jpg" },
        "alt": "Our facility",
        "caption": "Modern warehouse"
      }
    ],
    "teamSection": {
      "title": "Our Dedicated Team",
      "description": "Meet the passionate professionals...",
      "teamImage": { "url": "/uploads/team.jpg" },
      "teamImageAlt": "Our team at work"
    }
  }
}
```

## 🌍 Translation Content Examples

### English (en)
- **Hero Title**: "Crafting Spaces with"
- **Hero SubTitle**: "Premium Materials"
- **Content Title**: "Our Journey"
- **Showcase Title**: "Behind the Scenes"
- **Team Title**: "Our Dedicated Team"

### German (de)
- **Hero Title**: "Räume Gestalten mit"
- **Hero SubTitle**: "Premium Materialien"
- **Content Title**: "Unsere Reise"
- **Showcase Title**: "Hinter den Kulissen"
- **Team Title**: "Unser Engagiertes Team"

## 🔗 API Integration
The frontend calls:
```javascript
getOurStoryData({ locale: params.locale })
```

This sends the locale parameter and expects localized content for both English and German.

## ✅ Verification
After setup, test these URLs:
- `/en/our-story` - English content
- `/de/our-story` - German content

Both should display the appropriate translated content from your Strapi backend.
