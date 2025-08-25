function getAssetUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL?.replace("/api", "")}${path}`;
}

function getAuthHeaders(): Record<string, string> {
  const token = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

function getApiBase(): string {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "";
  if (!base) return "";
  try {
    const u = new URL(base);
    // strip any query/hash and normalize pathname
    const pathname = u.pathname.endsWith("/api")
      ? u.pathname
      : (u.pathname.replace(/\/$/, "") + "/api");
    return `${u.protocol}//${u.host}${pathname}`;
  } catch {
    // fallback if base isn't a full URL
    const noQuery = base.split("?")[0].split("#")[0];
    if (noQuery.endsWith("/api")) return noQuery;
    return noQuery.replace(/\/$/, "") + "/api";
  }
}
export async function getVisionData(locale: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages?locale=${locale}`
  );

  if (!res.ok) throw new Error("Failed to fetch Growth content");

  const data = await res.json();

  const iconDetailsSection = data?.data?.[0]?.Sections?.find(
    (section: any) => section.__component === "common.icon-details"
  );

  if (!iconDetailsSection) {
    return {
      name: [],
      backgroundImage: null,
      contentSection: null,
    };
  }

  const { name, backgroundImage, contentSection } = iconDetailsSection;

  return { name, backgroundImage, contentSection };
}

export async function getHeroData(locale: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages?locale=${locale}&populate[Sections][populate]=*`
  );

  if (!res.ok) throw new Error("Failed to fetch Growth content");

  const data = await res.json();
  const page = data?.data?.[0];

  // Step 2: Access the sections array
  const sections = page?.Sections || [];

  // Step 3: Find the "common.main-banner" component
  const mainBanner = sections.find(
    (section: any) => section.__component === "common.main-banner"
  );

  // Step 4: Extract relevant data
  const heroSection = mainBanner?.HeroSection?.[0] || null;
  const videoUrl = mainBanner?.backgroundVideo?.url
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${mainBanner.backgroundVideo.url}`
    : null;

  const buttonOneTitle = mainBanner?.buttonOneTitle || "";
  const buttonTwoTitle = mainBanner?.buttonTwoTitle || "";

  return {
    heroSection,
    videoUrl,
    buttonOneTitle,
    buttonTwoTitle,
  };
}

export async function getAllCategories(locale: any) {
  // 1️⃣ Read from env
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
  const assetURL = apiURL.replace(/\/api\/?$/, "");
  const [categoriesRes, pagesRes] = await Promise.all([
    fetch(`${apiURL}/categories?locale=${locale}&populate[backgroundImage]=*`),
    fetch(`${apiURL}/pages?locale=${locale}&populate[Sections][populate]=*`),
  ]);
  // 3️⃣ Error-check
  if (!categoriesRes.ok) {
    throw new Error(`Categories fetch failed: ${categoriesRes.statusText}`);
  }
  if (!pagesRes.ok) {
    throw new Error(`Pages fetch failed: ${pagesRes.statusText}`);
  }

  // 4️⃣ JSON-parse in parallel
  const [{ data: categoriesData }, { data: pagesData }] = await Promise.all([
    categoriesRes.json(),
    pagesRes.json(),
  ]);

  // 5️⃣ Extract premium-products info
  const page = pagesData[0];
  const premiumSection = page?.Sections.find(
    (sec: any) => sec.__component === "common.premium-products"
  );
  const details = {
    premiumBackgroundImage: premiumSection?.backgroundImage?.url
      ? `${assetURL}${premiumSection.backgroundImage.url}`
      : null,
    premiumDetails: {
      title: premiumSection?.commonSection?.title ?? "No title",
      subTitle: premiumSection?.commonSection?.subTitle ?? "No subtitle",
      description:
        premiumSection?.commonSection?.description ?? "No description",
    },
  };

  // 6️⃣ Shape categories array with backgroundImage from category itself
  const categories = categoriesData.map((category: any) => {
    return {
      id: category.id,
      title: category.name,
      slug: category?.slug,
      description: category.description,
      documentId: category.documentId,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      publishedAt: category.publishedAt,
      backgroundImage: category?.backgroundImage?.url
        ? `${assetURL}${category.backgroundImage.url}`
        : null,
      backgroundImageAlt: category?.backgroundImage?.alternativeText || "",
      backgroundImageName: category?.backgroundImage?.name || "",
    };
  });
  return {
    details,
    categories,
  };
}

export async function getDiscoveryData(locale: string) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
  const assetURL = apiURL.replace(/\/api\/?$/, "");

  const [discoveryRes] = await Promise.all([
    fetch(`${apiURL}/pages?locale=${locale}&populate[Sections][populate]=*`),
  ]);

  // ✅ Parse JSON
  const discoveryJson = await discoveryRes.json();

  // ✅ Find the discovery section
  const discoveryData = discoveryJson?.data?.[0]?.Sections?.find(
    (section: any) => section.__component === "common.discovery-section"
  );

  const discoveryContent = {
    title: discoveryData?.DiscoverySection?.title || "",
    subTitle: discoveryData?.DiscoverySection?.subTitle || "",
    description: discoveryData?.DiscoverySection?.description || "",
    backgroundImage: discoveryData?.backgroundImage?.url
      ? assetURL + discoveryData.backgroundImage.url
      : "",
  };

  return { discoveryContent };
}

export async function projectShowcaseData(locale: any) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
  const assetURL = apiURL.replace(/\/api\/?$/, "");

  const [res, resProjects] = await Promise.all([
    fetch(`${apiURL}/pages?locale=${locale}&populate[Sections][populate]=*`),
    fetch(`${apiURL}/projects?locale=${locale}&populate=*`),
  ]);

  if (!res?.ok || !resProjects?.ok) {
    throw new Error("Failed to fetch data");
  }

  const json = await res.json();
  const projectsJson = await resProjects.json();

  const showcaseSection = json?.data?.[0]?.Sections?.find(
    (section: any) => section.__component === "common.project-showcase"
  );


  // Transform projects data to match the expected format
  const projects = (projectsJson?.data || []).map((project: any) => {
    const node = project.attributes ?? project;
    const heading = node.heading ?? {};

    // Get background image from heading.mainImage
    let backgroundImage: string | null = null;
    const mainImage = heading?.mainImage ?? node?.mainImage;
    if (mainImage) {
      if (typeof mainImage.url === "string") {
        backgroundImage = assetURL + mainImage.url;
      } else if (mainImage.data) {
        const u = mainImage.data?.attributes?.url || mainImage.data?.url;
        if (u) backgroundImage = assetURL + u;
      }
    }

    return {
      id: project.id,
      title: heading.title || "",
      slug: heading.slug || "",
      description: heading.description || "",
      backgroundImage,
    };
  });

  // Get background image from showcaseSection
  let showcaseBackgroundImage: string | null = null;
  const bgImage = showcaseSection?.backgroundImage;
  if (bgImage) {
    if (typeof bgImage.url === "string") {
      showcaseBackgroundImage = assetURL + bgImage.url;
    } else if (bgImage.data) {
      const u = bgImage.data?.attributes?.url || bgImage.data?.url;
      if (u) showcaseBackgroundImage = assetURL + u;
    }
  }

  return {
    title: showcaseSection?.title || "",
    description: showcaseSection?.description || "",
    backgroundImage: showcaseBackgroundImage,
    images: projects || [],
  };
}

export async function getProductsByCategorySlug({ categorySlug, locale }: any) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
  const assetURL = apiURL.replace(/\/api\/?$/, "");

  try {
    // Use the categories endpoint with slug filter to get the category and its products
    const url = `${apiURL}/categories?locale=${locale}&filters[slug][$eq]=${encodeURIComponent(categorySlug)}&populate[products][populate][mainImage]=*&populate[products][populate][gallery]=*&populate[products][populate][variations][populate][sizes][populate][sizes]=*&populate[products][populate][variations][populate][colors]=*&populate[products][populate][variations][populate][thicknesses]=*`;


    const res = await fetch(url);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Categories API Error Response:", errorText);
      throw new Error(`Failed to fetch category: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    if (!json.data || json.data.length === 0) {
      console.warn("No category found for slug:", categorySlug);
      return [];
    }

    const category = json.data[0];
    const products = category.products || [];

    console.log(`Found ${products.length} products for category: ${categorySlug}`);

    return products.map((product: any) => {
      const mainImage = product.mainImage;
      const gallery = product.gallery || [];

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        description: product.description,
        image: mainImage?.url ? `${assetURL}${mainImage.url}` : null,
        gallery: gallery.map((img: any) => ({
          url: img.url ? `${assetURL}${img.url}` : null,
          alternativeText: img.alternativeText || '',
          width: img.width,
          height: img.height,
        })),
        category: category.name,
        categorySlug: category.slug,
        variations: product.variations || [],
      };
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export async function getAllProducts({ locale }: { locale: string }) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
  const assetURL = apiURL.replace(/\/api\/?$/, "");

  try {
    // Get all categories with their products instead of using the broken products endpoint
    const url = `${apiURL}/categories?locale=${locale}&populate[products][populate][mainImage]=*&populate[products][populate][gallery]=*&populate[products][populate][variations][populate][sizes][populate][sizes]=*&populate[products][populate][variations][populate][colors]=*&populate[products][populate][variations][populate][thicknesses]=*`;
    console.log("Fetching all products via categories from:", url);

    const res = await fetch(url);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Categories API Error Response:", errorText);
      throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    console.log("All categories with products API Response:", json);

    if (!json.data) {
      console.warn("No data in API response for categories");
      return [];
    }

    // Flatten all products from all categories
    const allProducts: any[] = [];
    json.data.forEach((category: any) => {
      if (category.products && category.products.length > 0) {
        category.products.forEach((product: any) => {
          allProducts.push({
            ...product,
            category: category.name,
            categorySlug: category.slug,
          });
        });
      }
    });

    console.log(`Found ${allProducts.length} total products across all categories`);

    return allProducts.map((product: any) => {
      const mainImage = product.mainImage;
      const gallery = product.gallery || [];

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        description: product.description,
        image: mainImage?.url ? `${assetURL}${mainImage.url}` : null,
        gallery: gallery.map((img: any) => ({
          url: img.url ? `${assetURL}${img.url}` : null,
          alternativeText: img.alternativeText || '',
          width: img.width,
          height: img.height,
        })),
        category: product.category,
        categorySlug: product.categorySlug,
        variations: product.variations || [],
      };
    });
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

export async function getAllColors({ locale }: any) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

  const res = await fetch(`${apiURL}/colors?locale=${locale}&populate=*`);

  if (!res.ok) {
    throw new Error("Failed to fetch colors");
  }

  const json = await res.json();
  console.log("Colors API response:", json);

  const Colors = json?.data?.map(({ id, value }: any) => ({
    id,
    value: value,
  }));

  return Colors;
}

export async function getAllSizes({ locale }: any) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

  const res = await fetch(`${apiURL}/sizes?locale=${locale}&populate=*`);

  if (!res.ok) {
    throw new Error("Failed to fetch sizes");
  }

  const json = await res.json();
  console.log("Sizes API response:", json);

  const Sizes = json?.data?.map(({ id, size }: any) => ({
    id,
    value: size,
  }));

  return Sizes;
}

export async function getAllThickness({ locale }: any) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

  const res = await fetch(`${apiURL}/thicknesses?locale=${locale}&populate=*`);

  if (!res.ok) {
    throw new Error("Failed to fetch thickness");
  }

  const json = await res.json();
  console.log("Thickness API response:", json);

  const Thickness = json?.data.map(({ id, value }: any) => ({
    id,
    value: value,
  }));

  return Thickness;
}
export async function getFilteredProducts({
  locale,
  selectedFilters,
  category,
}: {
  locale: string;
  selectedFilters: any;
  category: string | null;
}) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
  const assetURL = apiURL.replace(/\/api\/?$/, "");

  try {
    // If filtering by category, use the categories endpoint
    if (category) {
      console.log("Fetching filtered products via category endpoint for:", category);
      return await getProductsByCategorySlug({ categorySlug: category, locale });
    }

    // For other filters or no category, try to get all products via categories
    const url = `${apiURL}/categories?locale=${locale}&populate[products][populate][mainImage]=*&populate[products][populate][gallery]=*&populate[products][populate][variations][populate][sizes][populate][sizes]=*&populate[products][populate][variations][populate][colors]=*&populate[products][populate][variations][populate][thicknesses]=*`;

    console.log("Fetching all products via categories for filtering:", url);

    const res = await fetch(url);

    if (!res.ok) {
      console.error(`Categories API failed: ${res.status}`);
      return [];
    }

    const json = await res.json();
    console.log("Categories API Response for filtering:", json);

    if (!json.data) {
      console.warn("No data in categories API response");
      return [];
    }

    // Flatten all products from all categories
    const allProducts: any[] = [];
    json.data.forEach((category: any) => {
      if (category.products && category.products.length > 0) {
        category.products.forEach((product: any) => {
          allProducts.push({
            ...product,
            category: category.name,
            categorySlug: category.slug,
          });
        });
      }
    });

    // Apply additional filters (colors, sizes, thickness) if any
    let filteredProducts = allProducts;

    if (selectedFilters.Colors?.length) {
      filteredProducts = filteredProducts.filter((product: any) => {
        // Check if product has any of the selected colors
        const productColors = product.variations?.flatMap((v: any) => v.colors?.map((c: any) => c.name)) || [];
        return selectedFilters.Colors.some((color: string) => productColors.includes(color));
      });
    }

    if (selectedFilters.Sizes?.length) {
      filteredProducts = filteredProducts.filter((product: any) => {
        // Check if product has any of the selected sizes
        const productSizes = product.variations?.flatMap((v: any) => v.sizes?.flatMap((s: any) => s.sizes?.map((size: any) => size.value))) || [];
        return selectedFilters.Sizes.some((size: string) => productSizes.includes(size));
      });
    }

    if (selectedFilters.Thickness?.length) {
      filteredProducts = filteredProducts.filter((product: any) => {
        // Check if product has any of the selected thicknesses
        const productThicknesses = product.variations?.flatMap((v: any) => v.thicknesses?.map((t: any) => t.value)) || [];
        return selectedFilters.Thickness.some((thickness: string) => productThicknesses.includes(thickness));
      });
    }

    console.log(`Filtered ${allProducts.length} products to ${filteredProducts.length} based on filters`);

    return filteredProducts.map((product: any) => {
      const mainImage = product.mainImage;
      const gallery = product.gallery || [];

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        description: product.description,
        image: mainImage?.url ? `${assetURL}${mainImage.url}` : null,
        gallery: gallery.map((img: any) => ({
          url: img.url ? `${assetURL}${img.url}` : null,
          alternativeText: img.alternativeText || '',
          width: img.width,
          height: img.height,
        })),
        category: product.category,
        categorySlug: product.categorySlug,
        variations: product.variations || [],
      };
    });

  } catch (error) {
    console.error("Error in getFilteredProducts:", error);
    return [];
  }
}

export async function getLayoutData(locale: any) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

  const res = await fetch(
    `${apiURL}/skeletons?populate[header][populate]=*&populate[footer][populate]=*&populate[logo][populate]=*&locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch layout data");
  }

  const assetURL = apiURL.replace(/\/api\/?$/, "");
  const json = await res.json();

  // Get first layout item
  const layoutData = Array.isArray(json?.data) ? json.data[0] : json?.data;

  if (!layoutData) return null;

  const {
    id,
    documentId,
    createdAt,
    updatedAt,
    publishedAt,
    locale: layoutLocale,
    header = [],
    footer = [],
    logo = [],
  } = layoutData;

  const headerItem =
    Array.isArray(header) && header.length > 0 ? header[0] : null;
  const headerLinks = headerItem?.headerLinks ?? [];

  // ✅ Properly extract footer item
  const footerItem =
    Array.isArray(footer) && footer.length > 0 ? footer[0] : null;

  const logoItem =
    Array.isArray(logo) && logo.length > 0 ? logo[0]?.logo : null;

  const formattedLogo = logoItem
    ? {
        ...logoItem,
        url: `${assetURL}${logoItem.url}`,
      }
    : null;

  return {
    id,
    documentId,
    createdAt,
    updatedAt,
    publishedAt,
    locale: layoutLocale,
    headerLinks,
    footer: {
      tagline: footerItem?.tagline || "",
      copyrightText: footerItem?.copyrightText || "",
      logoName: footerItem?.logoName || "",
      quickLinks: footerItem?.quickLinks ?? [],
      materialLinks: footerItem?.materialLinks ?? [],
      legalLinks: footerItem?.legalLinks ?? [],
      contactInfo: footerItem?.contactInfo ?? {},
    },
    logo: formattedLogo,
  };
}

export async function getRequestFormData({ locale }: any) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
  const res = await fetch(
    `${apiURL}/request-form?locale=${locale}&populate=formTitle,fieldName`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch request form data");
  }

  const json = await res.json();
  const data = json;

  if (!data) {
    throw new Error("No form data found");
  }

  const { id, documentId, createdAt, updatedAt, formTitle, fieldName } = data;

  return {
    id,
    documentId,
    createdAt,
    updatedAt,
    formTitle: {
      id: formTitle.id,
      title: formTitle.title,
      subTitle: formTitle.subTitle,
      description: formTitle.description,
    },
    fields: Array.isArray(fieldName)
      ? fieldName.map((f: any) => ({
          id: f.id,
          name: f.name,
        }))
      : [],
  };
}

export async function SendMessageFormData({ locale }: { locale: string }) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
  const res = await fetch(
    `${apiURL}/request-form?locale=${locale}&populate=formTitle,fieldName`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch request form data");
  }

  const json = await res.json();
  const data = json;

  if (!data) {
    throw new Error("No form data found");
  }

  const { id, documentId, createdAt, updatedAt, formTitle, fieldName } = data;

  return {
    id,
    documentId,
    createdAt,
    updatedAt,
    formTitle: {
      id: formTitle.id,
      title: formTitle.title,
      subTitle: formTitle.subTitle,
      description: formTitle.description,
    },
    fields: Array.isArray(fieldName)
      ? fieldName.map((f: any) => ({
          id: f.id,
          name: f.name,
        }))
      : [],
  };
}

export async function getProjectsData({ locale }: any) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

  const [projectsRes, galleriesRes] = await Promise.all([
    fetch(`${apiURL}/projects?locale=${locale}&populate=*`),
    fetch(
      `${apiURL}/galleries?populate[card][populate]=backgroundImage&locale=${locale}`
    ),
  ]);

  if (!projectsRes.ok || !galleriesRes.ok) {
    throw new Error("Failed to fetch data");
  }

  const projectsJson = await projectsRes.json();
  const galleriesJson = await galleriesRes.json();

  // ✅ Extract all cards from galleries
  const galleryCards =
    galleriesJson?.data?.flatMap((gallery: any) => gallery?.card || []) || [];

  // ✅ Optional: Map cards to include only required fields
  const cards = galleryCards.map((card: any) => ({
    id: card.id,
    title: card.title,
    description: card.description,
    height: card.height,
    backgroundImage: card.backgroundImage?.url
      ? getAssetUrl(card.backgroundImage.url)
      : null,
  }));

  return {
    projectsHeading: projectsJson?.data?.[0]?.heading || "",
    galleryCards: cards,
  };
}

// New helpers for Projects (aligned with Projects API update)
export type ProjectListItem = {
  id: number;
  title: string;
  mainImageUrl?: string | null;
};

export type ProjectGalleryImage = {
  id: number;
  url: string;
  alternativeText?: string | null;
};

export async function getAllProjects({ locale }: { locale: string }) {
  const apiURL = getApiBase();
  const assetURL = apiURL.replace(/\/api\/?$/, "");

  if (!apiURL) throw new Error("Missing NEXT_PUBLIC_BACKEND_URL or NEXT_PUBLIC_API_URL");

  const urlWithLocale = `${apiURL}/projects?locale=${encodeURIComponent(locale)}&populate=*`;
  let res = await fetch(urlWithLocale, {
    headers: {
      ...getAuthHeaders(),
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // Fallback: try without locale (in case the content-type isn't i18n-enabled)
    const urlNoLocale = `${apiURL}/projects?populate=*`;
    const retry = await fetch(urlNoLocale, {
      headers: { ...getAuthHeaders() },
      next: { revalidate: 60 },
    });
    if (!retry.ok) {
      let msg = "";
      try { msg = await retry.text(); } catch {}
      throw new Error(
        `Failed to fetch projects: ${retry.status} ${retry.statusText} @ ${urlNoLocale} ${msg ? "- " + msg : ""}`
      );
    }
    res = retry;
  }
  const json = await res.json();

  const items: ProjectListItem[] = (json?.data || []).map((item: any) => {
    const node = item.attributes ?? item;
    const heading = node.heading ?? {};
    const title = heading.title ?? node.title ?? "";
    const subTitle = heading.subTitle ?? "";
    const description = heading.description ?? "";
    const slug = heading.slug ?? `${title.toLowerCase()}-projects`;

    // Support both shapes:
    // 1) mainImage: { url: "/uploads/..." }
    // 2) mainImage: { data: { attributes: { url: "/uploads/..." } } }
    let mainImageUrl: string | null = null;
    const mainImage = heading?.mainImage ?? node?.mainImage;
    if (mainImage) {
      if (typeof mainImage.url === "string") {
        mainImageUrl = assetURL + mainImage.url;
      } else if (mainImage.data) {
        const u = mainImage.data?.attributes?.url || mainImage.data?.url;
        if (u) mainImageUrl = assetURL + u;
      }
    }

    // Process gallery images
    const rawGallery = node.gallery ?? node.gallery?.data ?? [];
    let galleryArray: any[] = [];
    if (Array.isArray(rawGallery)) {
      galleryArray = rawGallery;
    } else if (rawGallery?.data && Array.isArray(rawGallery.data)) {
      galleryArray = rawGallery.data;
    }

    const gallery = galleryArray.map((img: any) => {
      const imgNode = img.attributes ?? img;
      return {
        id: img.id,
        url: imgNode.url ? `${assetURL}${imgNode.url}` : null,
        alternativeText: imgNode.alternativeText || "",
        name: imgNode.name || "",
      };
    });

    // Process backgroundImage
    let backgroundImageUrl: string | null = null;
    const backgroundImage = node.backgroundImage;

    if (backgroundImage) {
      if (typeof backgroundImage.url === "string") {
        backgroundImageUrl = assetURL + backgroundImage.url;
      } else if (backgroundImage.data) {
        const u = backgroundImage.data?.attributes?.url || backgroundImage.data?.url;
        if (u) backgroundImageUrl = assetURL + u;
      }
    }

    return {
      id: item.id,
      title,
      subTitle,
      description,
      mainImageUrl,
      heading: { title, subTitle, description, slug },
      gallery,
      backgroundImage: backgroundImageUrl
    };
  });

  return items;
}

export async function getProjectByCategorySlug({
  locale,
  categorySlug,
}: {
  locale: string;
  categorySlug: string;
}) {
  // Get all projects and filter by slug in JavaScript since the API filter doesn't work
  const allProjects = await getAllProjects({ locale });

  // Find project by slug
  const project = allProjects.find((proj: any) => {
    const projectSlug = proj?.heading?.slug;
    return projectSlug === categorySlug;
  });

  if (!project) {
    return null;
  }

  // Return the project in the expected format
  return {
    id: project.id,
    title: (project as any).heading?.title || project.title || "",
    subTitle: (project as any).heading?.subTitle || "",
    description: (project as any).heading?.description || (project as any).description || "",
    slug: (project as any).heading?.slug || "",
    gallery: (project as any).gallery || [],
    backgroundImage: (project as any).backgroundImage || null,
  };
}

export async function getProjectByCategoryTitle({
  locale,
  categoryTitle,
}: {
  locale: string;
  categoryTitle: string;
}) {
  const apiURL = getApiBase();
  const assetURL = apiURL.replace(/\/api\/?$/, "");

  if (!apiURL) throw new Error("Missing NEXT_PUBLIC_BACKEND_URL or NEXT_PUBLIC_API_URL");

  const urlWithLocale = `${apiURL}/projects?locale=${encodeURIComponent(
    locale
  )}&filters[heading][title][$eq]=${encodeURIComponent(categoryTitle)}`;
  let res = await fetch(urlWithLocale, {
    headers: {
      ...getAuthHeaders(),
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    const urlNoLocale = `${apiURL}/projects?filters[heading][title][$eq]=${encodeURIComponent(categoryTitle)}`;
    const retry = await fetch(urlNoLocale, {
      headers: { ...getAuthHeaders() },
      next: { revalidate: 60 },
    });
    if (!retry.ok) {
      let msg = "";
      try { msg = await retry.text(); } catch {}
      throw new Error(
        `Failed to fetch project by title: ${retry.status} ${retry.statusText} @ ${urlNoLocale} ${msg ? "- " + msg : ""}`
      );
    }
    res = retry;
  }
  const json = await res.json();
  const item = json?.data?.[0];
  if (!item) return null;

  const node = item.attributes ?? item;
  const rawGallery = node.gallery ?? node.gallery?.data ?? [];
  let galleryArray: any[] = [];
  if (Array.isArray(rawGallery)) {
    galleryArray = rawGallery;
  } else if (rawGallery?.data && Array.isArray(rawGallery.data)) {
    galleryArray = rawGallery.data;
  }
  const gallery: ProjectGalleryImage[] = galleryArray.map((m: any) => {
    const url = m?.url || m?.attributes?.url || "";
    const alt = m?.alternativeText ?? m?.attributes?.alternativeText ?? null;
    return { id: m.id, url: url ? assetURL + url : "", alternativeText: alt };
  });

  return {
    id: item.id,
    title: (node.heading?.title ?? node.title ?? "") as string,
    subTitle: (node.heading?.subTitle ?? "") as string,
    description: (node.heading?.description ?? "") as string,
    gallery,
  };
}

export async function getCatalogueBySlug({ locale, category }: any) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

  try {
    // Fetch catalogues by slug directly (new structure doesn't need category lookup)
    const url = `${apiURL}/catalogues?locale=${locale}&filters[catalogueSlug][$eq]=${category}&populate=*`;
    const res = await fetch(url);

    if (!res.ok) {
      console.warn(`Failed to fetch catalogue: ${res.statusText}`);
      return [];
    }

    const data = await res.json();

    // Return empty array if no catalogue data
    if (!data?.data || data.data.length === 0) {
      console.warn(`No catalogue data found for slug: ${category}`);
      return [];
    }

    const assetURL = apiURL.replace(/\/api\/?$/, "");

    // Transform the new catalogue structure to match expected format
    const transformedCollections = data?.data?.flatMap((catalogue: any) => {
      // Return catalogue items instead of the catalogue itself
      return catalogue.catalogueItems?.map((item: any) => {
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          features: item.keyFeatures?.map((kf: any) => kf.option) || [],
          image: item.thumbnail?.url ? `${assetURL}${item.thumbnail.url}` : "/placeholder.jpg",
          fileUrl: item.file?.url ? `${assetURL}${item.file.url}` : null,
          slug: item.slug,
          // Include catalogue info for context
          catalogueTitle: catalogue.catalogueTitle,
          catalogueDescription: catalogue.catalogueDescription,
        };
      }) || [];
    }) || [];

    return transformedCollections;
  } catch (error) {
    console.error(`Error fetching catalogue for ${category}:`, error);
    return [];
  }
}

export async function getAboutUsData(locale: string) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

  const res = await fetch(
    `${apiURL}/pages?locale=${locale}&populate[Sections][populate]=*`
  );

  if (!res.ok) throw new Error("Failed to fetch About Us content");

  const data = await res.json();

  const aboutSection = data?.data?.[0]?.Sections?.find(
    (section: any) => section.__component === "common.about-us"
  );
  if (!aboutSection) return null;

  const headingData = aboutSection.heading?.[0] || {};
  const title = headingData.title || "";
  const subTitle = headingData.subTitle || "";
  const description = headingData.description || "";

  const image = aboutSection.backgroundImage?.url
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${aboutSection.backgroundImage.url}`
    : null;

  return {
    title,
    subTitle,
    description,
    image,
  };
}



export async function getCollectionData({ locale }: any) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

  const res = await fetch(
    `${apiURL}/pages?locale=${locale}&populate[Sections][populate]=*`
  );

  if (!res.ok) throw new Error("Failed to fetch Growth content");

  const data = await res.json();

  const collectionSectionDetails = data?.data?.[0]?.Sections?.find(
    (section: any) => section.__component === "common.collections-section"
  );

  if (!collectionSectionDetails) return null;

  const {
    id: sectionId,
    CollectionComponent: {
      id: collectionComponentId,
      title,
      subTitle,
      description,
    } = {},
    backgroundImage: {
      id: bgImageId,
      name,
      url = "",
      alternativeText,
      caption,
      width,
      height,
      formats,
      ext,
      mime,
      size,
    } = {},
    cards = [],
  } = collectionSectionDetails;

  const assetURL = apiURL.replace(/\/api\/?$/, "");

  const assetUrl = `${assetURL}${url}`;

  return {
    sectionId,
    collectionComponent: {
      id: collectionComponentId,
      title,
      subTitle,
      description,
    },
    backgroundImage: {
      id: bgImageId,
      name,
      assetUrl,
      alternativeText,
      caption,
      width,
      height,
      formats,
      ext,
      mime,
      size,
    },
  };
}

export async function getAllCatalogues(locale: string) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
  const assetURL = apiURL.replace(/\/api\/?$/, "");

  try {
    // Fetch catalogues with new structure
    const cataloguesRes = await fetch(`${apiURL}/catalogues?locale=${locale}&populate=*`);

    if (!cataloguesRes.ok) {
      console.warn(`Failed to fetch catalogues: ${cataloguesRes.statusText}`);
      return { collections: [] };
    }

    const cataloguesData = await cataloguesRes.json();

    // Transform catalogues to match the expected format for Collections component
    const collections = cataloguesData?.data?.map((item: any) => {
      const image = item?.catalogueImage;

      return {
        id: item.id,
        title: item.catalogueTitle,
        slug: item.catalogueSlug,
        description: item.catalogueDescription,
        documentId: item.documentId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
        backgroundImage: image?.url ? `${assetURL}${image.url}` : null,
        backgroundImageAlt: image?.alternativeText || "",
        backgroundImageName: image?.name || "",
        // Include catalogue items for future use
        catalogueItems: item.catalogueItems || [],
      };
    }) || [];

    return {
      collections,
    };
  } catch (error) {
    console.error("Error fetching catalogues:", error);
    return { collections: [] };
  }
}

// Keep the old function for backward compatibility (deprecated)
export async function getAllCollections(locale: string) {
  console.warn("getAllCollections is deprecated. Use getAllCatalogues instead.");
  return getAllCatalogues(locale);
}

export async function getProductById({ locale, id }: any) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
  const assetURL = apiURL.replace(/\/api\/?$/, "");

  try {
    // First try the direct products endpoint
    const res = await fetch(
      `${apiURL}/products/${id}?locale=${locale}&populate=*`
    );

    if (res.ok) {
      const { data } = await res.json();

      const {
        id: productId,
        name,
        slug,
        description,
        price,
        category,
        variations,
        backgroundImage,
        catalogue,
        // Only essential dynamic fields
        deliveryInfo,
        taxInfo,
      } = data;

      // Add assetURL to each image and its formats
      const backgroundImageWithFullUrls = backgroundImage.map((img: any) => ({
        ...img,
        url: assetURL + img.url,
        formats: Object.fromEntries(
          Object.entries(img.formats || {}).map(([key, format]: [string, any]) => [
            key,
            {
              ...format,
              url: assetURL + format.url,
            },
          ])
        ),
      }));

      // Prepend assetURL to catalogue file if it exists
      const updatedCatalogue = catalogue?.file
        ? {
            ...catalogue,
            file: {
              ...catalogue.file,
              url: assetURL + catalogue.file.url,
            },
          }
        : catalogue;

      return {
        id: productId,
        name,
        slug,
        description,
        price,
        category,
        variations,
        backgroundImage: backgroundImageWithFullUrls,
        catalogue: updatedCatalogue,
        // Only essential dynamic fields from Strapi
        deliveryInfo,
        taxInfo,
      };
    }
  } catch (error) {
    console.log("Direct products endpoint failed, trying categories endpoint");
  }

  // Fallback: Get product from categories endpoint
  return await getProductByIdFromCategories({ locale, id });
}

export async function getProductByIdFromCategories({ locale, id }: any) {
  const apiURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
  const assetURL = apiURL.replace(/\/api\/?$/, "");

  try {
    // Get all categories with their products
    const url = `${apiURL}/categories?locale=${locale}&populate[products][populate][mainImage]=*&populate[products][populate][gallery]=*&populate[products][populate][variations][populate][sizes][populate][sizes]=*&populate[products][populate][variations][populate][colors]=*&populate[products][populate][variations][populate][thicknesses]=*`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const categories = json.data || [];

    // Find the product across all categories
    let foundProduct = null;
    for (const category of categories) {
      const product = category.products?.find((p: any) => p.id === parseInt(id));
      if (product) {
        foundProduct = product;
        break;
      }
    }

    if (!foundProduct) {
      throw new Error(`Product with ID ${id} not found`);
    }

    // Transform the product data to match the expected format
    const mainImage = foundProduct.mainImage;
    const gallery = foundProduct.gallery || [];

    // Create backgroundImage array from mainImage and gallery
    const backgroundImage = [];
    if (mainImage) {
      backgroundImage.push({
        ...mainImage,
        url: `${assetURL}${mainImage.url}`,
      });
    }
    gallery.forEach((img: any) => {
      backgroundImage.push({
        ...img,
        url: `${assetURL}${img.url}`,
      });
    });

    return {
      id: foundProduct.id,
      name: foundProduct.name,
      slug: foundProduct.slug,
      description: foundProduct.description,
      price: foundProduct.price,
      category: foundProduct.category,
      variations: foundProduct.variations,
      backgroundImage: backgroundImage,
      catalogue: foundProduct.catalogue || null,
      // Only essential dynamic fields from Strapi
      deliveryInfo: foundProduct.deliveryInfo,
      taxInfo: foundProduct.taxInfo,
    };
  } catch (error) {
    console.error("Error fetching product by ID from categories:", error);
    throw error;
  }
}

export async function getInTouchHeadingData({ locale }: any) {
  const apiURL = process.env.NEXT_PUBLIC_BACKEND_URL; // e.g. "http://127.0.0.1:1337/api"
  const res = await fetch(
    `${apiURL}/api/pages?locale=${locale}&populate[Sections][populate]=*`
  );

  if (!res.ok) throw new Error("Failed to fetch Growth content");

  const data = await res.json();
  const getInTouchSectionDetails = data?.data?.[0]?.Sections?.find(
    (section: any) => section.__component === "common.get-in-touch"
  );

  return getInTouchSectionDetails;
}

export async function getCatalogueHeadingData({ locale }: any) {
  const apiURL = process.env.NEXT_PUBLIC_BACKEND_URL; // e.g. "http://127.0.0.1:1337/api"

  try {
    const res = await fetch(
      `${apiURL}/api/pages?locale=${locale}&populate[Sections][populate]=*`
    );

    if (!res.ok) {
      console.warn(`Failed to fetch Catalogue heading content: ${res.statusText}`);
      return null;
    }

    const data = await res.json();

    const catalogueSectionDetails = data?.data?.[0]?.Sections?.find(
      (section: any) => section.__component === "common.catalogue-heading"
    );

    if (!catalogueSectionDetails) {
      console.warn("No catalogue heading section found");
      return null;
    }

    const {
      id: sectionId,
      catalogueHeading: [
        { id: headingId, title = "", subTitle = "", description = "" } = {},
      ] = [],
    } = catalogueSectionDetails;

    return {
      sectionId,
      heading: {
        id: headingId,
        title,
        subTitle,
        description,
      },
    };
  } catch (error) {
    console.error("Error fetching catalogue heading data:", error);
    return null;
  }
}

export async function getImpressumData({ locale }: any) {
  const apiURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(
    `${apiURL}/api/impressum?populate[impressumContactDetails]=*&locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch direct contact content");
  }

  const data = await res.json();
  return data;
}

export async function getDirectContactData({ locale }: any) {
  const apiURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // First fetch - DO NOT CHANGE
  const res = await fetch(
    `${apiURL}/api/pages?locale=${locale}&populate[Sections][populate]=*`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch direct contact content");
  }

  const data = await res.json();

  const directSection = data?.data?.[0]?.Sections?.find(
    (section: any) => section.__component === "common.direct-contact"
  );

  if (!directSection) return null;

  const {
    id: sectionId,
    directContactComponentHeading: {
      id: headingId,
      title = "",
      subTitle = "",
      description = "",
    } = {},
  } = directSection;



  const contactRes = await fetch(`${apiURL}/api/contact?populate[contactDetails][populate]=icon`);



  if (!contactRes.ok) {
    throw new Error("Failed to fetch contact card details");
  }

  const contactData = await contactRes.json();

  const contactCards = contactData?.data?.contactDetails || [];
  return {
    sectionId,
    heading: {
      id: headingId,
      title,
      subTitle,
      description,
    },
    contactCards,
  };
}

export async function getOurStoryData({ locale }: any) {
  const apiURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Deep populate to get all nested fields including media
  const params = new URLSearchParams({
    locale: locale,
    populate: "deep",
  });

  try {

    const res = await fetch(
      `${apiURL}/api/our-story?${params.toString()}&populate=deep`,
      {
        headers: {
          ...getAuthHeaders(),
        },
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch our-story data: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    console.log("Our Story API Response:", JSON.stringify(data, null, 2));

    return data?.data;
  } catch (error) {
    console.error("Error fetching our story data:", error);
    return null;
  }
}
