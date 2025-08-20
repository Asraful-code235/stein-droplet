import React from "react";
import Image from "next/image";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
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
    // Render gallery images if provided (single project view)
    const perCol = Math.ceil(gallery.length / columnCount);
    const galleryColumns: GalleryImage[][] = Array.from(
      { length: columnCount },
      (_, i) => gallery.slice(i * perCol, (i + 1) * perCol)
    );

    return (
      <div className="pb-8">
        <div className="mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryColumns.map((col, colIndex) => (
              <div key={`gcol-${colIndex}`} className="space-y-6">
                {col.map((img) => (
                  <div
                    key={img.id}
                    className="group relative  h-[400px] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500"
                  >
                    <div className="absolute inset-0 group overflow-hidden transition-all duration-500 ease-in-out">
                      <Image
                        src={img.url}
                        alt={img.alternativeText || "Project Image"}
                        fill
                        className="object-cover group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-white text-lg font-medium">
                          {/* {title || "View Project"} */}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
      <div className="mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {columns.map((column, colIndex) => (
            <div key={`column-${colIndex}`} className="space-y-6">
              {column.map((project) => {
                const imgSrc =
                  project?.mainImageUrl ||
                  project?.backgroundImage ||
                  "/fallback.jpg";

                return (
                  <div
                    key={project.id}
                    className="group relative h-[400px] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500"
                  >
                    <Link
                      href={`/en/projects?category=${project?.title}`}
                      className="absolute inset-0"
                    >
                      <Image
                        src={imgSrc}
                        alt={project?.title || "Project Image"}
                        fill
                        className="object-cover group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-white text-lg font-medium">
                          {/* {title || "View Project"} */}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;
