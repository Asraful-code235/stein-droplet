import GalleryBanner from "@/components/gallery/GalleryBanner";
import ProjectGallery from "@/components/gallery/ProjectGallery";
import { getAllProjects, getProjectByCategoryTitle, projectShowcaseData } from "@/lib/api";
import { getTranslation } from "@/lib/i18n-server";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { category?: string };
}) {
  const { t } = getTranslation(params.locale);
  const category = searchParams?.category;
  const title = category ? t('projects.projectsCategoryTitle', { category }) : t('projects.projectsTitle');
  const description = category
    ? t('projects.exploreProjects', { category })
    : t('projects.exploreAllProjects');
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
    const project = await getProjectByCategoryTitle({
      locale: params.locale,
      categoryTitle: category,
    });
    const gallery = project?.gallery || [];
    const bannerData = {
      title: project?.title || "",
      subTitle: project?.subTitle || "",
      description: project?.description || "",
    };
    return (
      <div className="bg-[#D4C0A8]">
        <GalleryBanner data={bannerData} />
        <div className="py-8">
          <ProjectGallery gallery={gallery} />
        </div>
      </div>
    );
  }

  const [projects, showcase] = await Promise.all([
    getAllProjects({ locale: params.locale }),
    projectShowcaseData(params.locale),
  ]);
  const first = {
    title: showcase?.title || "",
    subTitle: "",
    description: showcase?.description || "",
  };

  return (
    <div className="bg-[#D4C0A8]">
      {first && <GalleryBanner data={first} />}
      <div className="py-8">{projects && <ProjectGallery projects={projects as any} />}</div>
    </div>
  );
}
