## Projects API Update — Gallery and Main Image

Date: 2025‑08‑20
Scope: Backend changes to `project` model and controller, and how the frontend should consume them.

### Summary
- Added `gallery` (media, multiple images) to `api::project.project`.
- Added `mainImage` (single image) to the `common.section` component used by `project.heading`.
- Updated `project` controller to populate `gallery` and `heading.mainImage` by default for both list and single fetches.

No existing fields were changed or removed.

### Backend files touched
- `src/api/project/content-types/project/schema.json`: added `gallery` media field.
- `src/components/common/section.json`: added `mainImage` media field.
- `src/api/project/controllers/project.ts`: now populates `gallery` and `heading.mainImage` in `find` and `findOne`.

### Content authoring (Strapi Admin)
- Go to Content Manager → Projects → edit/create.
- Under Heading, upload the `mainImage`.
- Use the `gallery` field to upload multiple images per project.

### API behavior (REST)
Base URL: `${BACKEND_URL}/api`

- List projects (populated):
  - GET `/api/projects`
- Single project (populated):
  - GET `/api/projects/:id`

The controller already deep‑populates:
- `heading` including `mainImage`
- `gallery`

You do NOT need to pass `populate` for these fields, but you still can:
`/api/projects?populate[gallery]=*&populate[heading][populate][mainImage]=*`

### Example response (trimmed)
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "heading": {
          "title": "Project title",
          "subTitle": "Subtitle",
          "description": "...",
          "mainImage": {
            "data": {
              "id": 101,
              "attributes": {
                "url": "/uploads/hero.jpg",
                "alternativeText": null,
                "formats": {
                  "thumbnail": { "url": "/uploads/thumbnail_hero.jpg" }
                }
              }
            }
          }
        },
        "gallery": {
          "data": [
            {
              "id": 201,
              "attributes": {
                "url": "/uploads/img1.jpg",
                "alternativeText": null
              }
            },
            {
              "id": 202,
              "attributes": {
                "url": "/uploads/img2.jpg"
              }
            }
          ]
        }
      }
    }
  ],
  "meta": { "pagination": { "page": 1, "pageSize": 25, "pageCount": 1, "total": 1 } }
}
```

Note: prepend media URLs with your backend origin, e.g. `https://backend.steinmarine.de`.

### Frontend implementation notes (Next.js 14)

- Remote images config (next.config.js):
```js
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'backend.steinmarine.de' },
    ],
  },
};
```

- Env: ensure the API URL is set
```bash
NEXT_PUBLIC_API_URL=https://backend.steinmarine.de/api
```

- Fetch projects
```ts
const API = process.env.NEXT_PUBLIC_API_URL;
export async function fetchProjects() {
  const res = await fetch(`${API}/projects`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to load projects');
  return res.json();
}
```

- Types (simplified)
```ts
export type MediaFile = {
  id: number;
  attributes: { url: string; alternativeText?: string | null; formats?: Record<string, { url: string }> };
};

export type Project = {
  id: number;
  attributes: {
    heading?: {
      title?: string | null;
      subTitle?: string | null;
      description?: string | null;
      mainImage?: { data: MediaFile | null } | null;
    } | null;
    gallery?: { data: MediaFile[] } | null;
  };
};
```

- Using images in components
```tsx
import Image from 'next/image';

function ProjectHero({ project }: { project: Project }) {
  const img = project.attributes.heading?.mainImage?.data;
  const url = img ? `https://backend.steinmarine.de${img.attributes.url}` : undefined;
  return url ? (
    <Image src={url} alt={img.attributes.alternativeText ?? 'Project image'} width={1600} height={900} />
  ) : null;
}

function ProjectGallery({ project }: { project: Project }) {
  const items = project.attributes.gallery?.data ?? [];
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((m) => (
        <Image key={m.id} src={`https://backend.steinmarine.de${m.attributes.url}`} alt={m.attributes.alternativeText ?? ''} width={800} height={600} />
      ))}
    </div>
  );
}
```

### Optional query params
- Pagination: `?pagination[page]=1&pagination[pageSize]=24`
- Locale (if needed): `?locale=de` (schemas are i18n‑enabled but `project` heading is localized only if configured that way).

### Deployment notes
- After adding new fields in Strapi, rebuild the backend admin and restart:
```bash
cd /var/www/stein-backend-dev
npm run build && pm2 restart stein-backend
```
- Frontend needs only a rebuild/redeploy if pages/components rely on the new data.

### Backwards compatibility
- No breaking changes; existing consumers can ignore `gallery` and `heading.mainImage`.


