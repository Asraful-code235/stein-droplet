import GalleryBanner from "@/components/gallery/GalleryBanner";
import ProjectGallery from "@/components/gallery/ProjectGallery";
import {
  getAllProjects,
  getProjectByCategorySlug,
  projectShowcaseData,
  getAllCategories,
} from "@/lib/api";
import { getTranslation } from "@/lib/i18n-server";
import Image from "next/image";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { category?: string };
}) {
  const { t } = getTranslation(params.locale);
  const category = searchParams?.category;
  const title = category
    ? t("projects.projectsCategoryTitle", { category })
    : t("projects.projectsTitle");
  const description = category
    ? t("projects.exploreProjects", { category })
    : t("projects.exploreAllProjects");
  return { title, description };
}

export default async function GalleryPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { category?: string };
}) {
  const category = searchParams?.category;

  if (category) {
    const [project, categories, allProjects] = await Promise.all([
      getProjectByCategorySlug({
        locale: params.locale,
        categorySlug: category,
      }),
      getAllCategories(params.locale),
      getAllProjects({ locale: params.locale }),
    ]);

    let gallery = project?.gallery || [];

    // If no specific project found, filter from all projects by category slug
    if (!project || gallery.length === 0) {
      // Filter projects that match the category slug
      const matchingProjects =
        allProjects?.filter((proj: any) => {
          const projectCategorySlug = proj?.heading?.slug || proj?.slug;
          return projectCategorySlug === category;
        }) || [];

      // Combine galleries from all matching projects
      gallery = matchingProjects.flatMap((proj: any) => proj?.gallery || []);
    }

    // Use project background image if available, otherwise use category background image
    const categoryData = categories?.categories?.find(
      (cat: any) => cat.slug === category
    );
    const backgroundImage =
      project?.backgroundImage || categoryData?.backgroundImage;


    return (
      <div className="min-h-screen relative">
        {/* Background Image */}
        {backgroundImage ? (
          <div className="absolute inset-0 -z-20">
            <Image
              src={backgroundImage}
              alt="Project Background"
              fill
              className="object-cover"
              priority
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-[#D4C0A8]"></div>
        )}

        {/* Content */}
        <div className="relative z-20">
          <div className="py-8 flex justify-center items-center min-h-screen">
            <ProjectGallery gallery={gallery} />
          </div>
        </div>
      </div>
    );
  }

  const [projects, showcase] = await Promise.all([
    getAllProjects({ locale: params.locale }),
    projectShowcaseData(params.locale),
  ]);

  // Use first image from showcase as background
  const firstShowcaseImage = showcase?.images?.[0]?.backgroundImage;

  const first = {
    title: showcase?.title || "",
    subTitle: "",
    description: showcase?.description || "",
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      {firstShowcaseImage ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={firstShowcaseImage}
            alt="Projects Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-[#D4C0A8]"></div>
      )}

      {/* Content */}
      <div className="relative z-20">
        {first && <GalleryBanner data={first} />}
        <div className="py-8 flex justify-center items-center">
          {projects && (
            <ProjectGallery
              projects={projects as any}
            />
          )}
        </div>
      </div>
    </div>
  );
}
