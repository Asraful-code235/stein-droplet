// app/[lang]/page.tsx
import {
  getAllCategories,
  getAllCollections,
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

export default async function Page({ params }: { params: { locale: string } }) {
  const [heroData, categoriesData, discoveryData, projectShowcase, collectionData, collectionCards, projects] =
    await Promise.all([
      getHeroData(params.locale),
      getAllCategories(params.locale),
      getDiscoveryData(params.locale),
      projectShowcaseData(params.locale),
      getCollectionData({ locale: params.locale }),
      getAllCollections(params.locale),
      getAllProjects({ locale: params.locale }),
    ]);

  if (!heroData) {
    return <div>Failed to load hero content</div>;
  }

  if (!discoveryData?.discoveryContent) {
    return <div>Failed to load discovery</div>;
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
          collectionCards={collectionCards?.collections}
          data={collectionData}
          locale={params?.locale}
        />{" "}
        *
      </div>
    </ParallaxWrapper>
  );
}
