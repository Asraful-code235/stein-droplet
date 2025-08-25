// app/[lang]/page.tsx
import {
  getAllCategories,
  getAllCatalogues,
  getCollectionData,
  getDiscoveryData,
  getHeroData,
  projectShowcaseData,
  getAllProjects,
} from "@/lib/api";
import Hero from "@/components/home/Banner";
import QuoteSection from "@/components/home/StorySection";
import GallerySection from "@/components/home/ProjectShowcase";
import Vision from "@/components/home/Vision";
import Collections from "@/components/home/Collections";
import ParallaxWrapper from "@/components/parallelWrapper";
import { getTranslation } from "@/lib/i18n-server";

export default async function Page({ params }: { params: { locale: string } }) {
  const { t } = getTranslation(params.locale);

  const [heroData, categoriesData, discoveryData, projectShowcase, collectionData, catalogueCards, projects] =
    await Promise.all([
      getHeroData(params.locale),
      getAllCategories(params.locale),
      getDiscoveryData(params.locale),
      projectShowcaseData(params.locale),
      getCollectionData({ locale: params.locale }),
      getAllCatalogues(params.locale),
      getAllProjects({ locale: params.locale }),
    ]);

  if (!heroData) {
    return <div>{t('common.failedToLoadHero')}</div>;
  }

  if (!discoveryData?.discoveryContent) {
    return <div>{t('common.failedToLoadDiscovery')}</div>;
  }

  const { categories, details } = categoriesData;
  return (
    <ParallaxWrapper>
      <div className="relative">
        {heroData && <Hero data={heroData} />}
        {details?.premiumDetails && (
          <Vision details={details} data={categories} />
        )}
        <QuoteSection discoveryData={discoveryData?.discoveryContent} />
        <GallerySection data={projectShowcase} projects={projects}   locale={params?.locale} />
        <Collections
          collectionCards={catalogueCards?.collections}
          data={collectionData}
          locale={params?.locale}
        />{" "}
        *
      </div>
    </ParallaxWrapper>
  );
}
