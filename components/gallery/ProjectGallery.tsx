import React from "react";
import Image from "next/image";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  heading: {
    title: string;
    slug: string;
  };
  description?: string;
  backgroundImage?: string; // existing shape support
  mainImageUrl?: string | null; // new projects list shape
  category?: {
    name: string;
  };
};

type GalleryImage = {
  id: number;
  url: string;
  alternativeText?: string | null;
};

const ProjectGallery = ({
  projects,
  gallery,
}: {
  projects?: Project[];
  gallery?: GalleryImage[];
}) => {
  const columnCount = 3;
  const columns: Project[][] = Array.from({ length: columnCount }, () => []);

  if (gallery && gallery.length) {
    return (
      <div className="pb-8">
        <div className="mx-auto px-4 max-w-6xl relative z-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((col, colIndex) => (
              <div
                key={col.id}
                className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="h-[400px]">
                  <Image
                    src={col.url}
                    alt={col?.alternativeText || "Project Image"}
                    width={500}
                    height={400}
                    className="object-cover group-hover:scale-105 w-full !h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  (projects || []).forEach((project, index) => {
    columns[index % columnCount].push(project);
  });

  return (
    <div className="pb-8">
      <div className="mx-auto px-4 max-w-6xl w-full relative z-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projects &&
            projects.map((project) => {
              const imgSrc =
                project?.mainImageUrl ||
                project?.backgroundImage ||
                "/fallback.jpg";

              return (
                <div
                  key={project.id}
                  className="group overflow-hidden h-[400px] relative rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 col-span-1"
                >
                  <Link
                    href={`/en/projects?category=${project?.heading?.slug}`}
                    className=" h-[400px] w-full "
                  >
                    <Image
                      src={imgSrc}
                      alt={project?.title || "Project Image"}
                      width={500}
                      height={400}
                      className="object-cover group-hover:scale-105 w-[400px] !h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6 transition-opacity duration-500">
                      <span className="text-white text-lg font-medium">
                        {project?.title || "View Project"}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;
