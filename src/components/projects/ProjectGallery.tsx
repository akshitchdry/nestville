"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Expand,
  Grid2X2,
  X,
} from "lucide-react";

type GallerySize = "large" | "wide" | "normal";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  size?: GallerySize;
}

interface ProjectGalleryProps {
  title?: string;
  subtitle?: string;
  images?: GalleryImage[];
}

const defaultImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/projects/gallery/gallery-1.jpg",
    alt: "Luxury residence exterior",
    category: "Exterior",
    size: "large",
  },
  {
    id: 2,
    src: "/images/projects/gallery/gallery-2.jpg",
    alt: "Premium living room",
    category: "Interior",
    size: "normal",
  },
  {
    id: 3,
    src: "/images/projects/gallery/gallery-3.jpg",
    alt: "Modern master bedroom",
    category: "Interior",
    size: "normal",
  },
  {
    id: 4,
    src: "/images/projects/gallery/gallery-4.jpg",
    alt: "Infinity swimming pool",
    category: "Amenities",
    size: "wide",
  },
  {
    id: 5,
    src: "/images/projects/gallery/gallery-5.jpg",
    alt: "Designer kitchen",
    category: "Interior",
    size: "normal",
  },
  {
    id: 6,
    src: "/images/projects/gallery/gallery-6.jpg",
    alt: "Private landscaped garden",
    category: "Landscape",
    size: "normal",
  },
  {
    id: 7,
    src: "/images/projects/gallery/gallery-7.jpg",
    alt: "Luxury bathroom",
    category: "Interior",
    size: "normal",
  },
  {
    id: 8,
    src: "/images/projects/gallery/gallery-8.jpg",
    alt: "Panoramic skyline view",
    category: "Views",
    size: "large",
  },
];

export default function ProjectGallery({
  title = "Designed Beyond Expectations",
  subtitle = "Explore refined architecture, premium interiors and timeless spaces created for an exceptional lifestyle.",
  images = defaultImages,
}: ProjectGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(images.map((image) => image.category)),
    );

    return ["All", ...uniqueCategories];
  }, [images]);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") {
      return images;
    }

    return images.filter((image) => image.category === activeCategory);
  }, [activeCategory, images]);

  const selectedImage =
    selectedIndex !== null ? filteredImages[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (selectedIndex === null) {
        return;
      }

      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((currentIndex) => {
          if (currentIndex === null) {
            return null;
          }

          return currentIndex === 0
            ? filteredImages.length - 1
            : currentIndex - 1;
        });
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((currentIndex) => {
          if (currentIndex === null) {
            return null;
          }

          return currentIndex === filteredImages.length - 1
            ? 0
            : currentIndex + 1;
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filteredImages.length, selectedIndex]);

  function openLightbox(index: number) {
    setSelectedIndex(index);
  }

  function closeLightbox() {
    setSelectedIndex(null);
  }

  function showPreviousImage() {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return null;
      }

      return currentIndex === 0
        ? filteredImages.length - 1
        : currentIndex - 1;
    });
  }

  function showNextImage() {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return null;
      }

      return currentIndex === filteredImages.length - 1
        ? 0
        : currentIndex + 1;
    });
  }

  function getCardClass(size: GallerySize = "normal") {
    if (size === "large") {
      return "sm:col-span-2 sm:row-span-2";
    }

    if (size === "wide") {
      return "sm:col-span-2";
    }

    return "";
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#070706] py-24 sm:py-28 lg:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-[#d4af67]/10 blur-[170px]" />

          <div className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[#d4af67]/10 blur-[180px]" />

          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:80px_80px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-[#d4af67]" />

                <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af67] sm:text-xs">
                  Project Gallery
                </span>
              </div>

              <h2 className="mt-7 text-4xl font-light leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-7xl">
                {title}
              </h2>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
                {subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
              }}
              className="inline-flex w-fit items-center gap-4 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 backdrop-blur-xl"
            >
              <Grid2X2 size={16} className="text-[#d4af67]" />

              <span className="text-[10px] uppercase tracking-[0.28em] text-white/50">
                {filteredImages.length} Visuals
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="mt-12 flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setSelectedIndex(null);
                  }}
                  className={`relative shrink-0 overflow-hidden rounded-full border px-6 py-3 text-[10px] uppercase tracking-[0.24em] transition-all duration-500 ${
                    isActive
                      ? "border-[#d4af67] text-[#12100c]"
                      : "border-white/10 bg-white/[0.025] text-white/45 hover:border-[#d4af67]/40 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-gallery-category"
                      className="absolute inset-0 bg-[#d4af67]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </motion.div>

          <motion.div
            layout
            className="mt-10 grid auto-rows-[240px] grid-cols-1 gap-4 sm:auto-rows-[280px] sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.button
                  layout
                  key={image.id}
                  type="button"
                  onClick={() => openLightbox(index)}
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#11110f] text-left ${getCardClass(
                    image.size,
                  )}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />

                  <div className="absolute inset-0 bg-[#b9924f]/0 transition-colors duration-500 group-hover:bg-[#b9924f]/10" />

                  <div className="absolute left-5 top-5">
                    <span className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[9px] uppercase tracking-[0.25em] text-white/70 backdrop-blur-xl">
                      {image.category}
                    </span>
                  </div>

                  <div className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white opacity-0 backdrop-blur-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Expand size={17} />
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="flex items-end justify-between gap-5">
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af67]">
                          NestVille Collection
                        </span>

                        <p className="mt-2 text-lg font-light text-white">
                          {image.alt}
                        </p>
                      </div>

                      <span className="text-xs text-white/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="mt-5 h-px overflow-hidden bg-white/10">
                      <span className="block h-full w-0 bg-[#d4af67] transition-all duration-700 group-hover:w-full" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="mt-12 rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
              <p className="text-sm text-white/50">
                No gallery images available in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && selectedIndex !== null && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl sm:p-8"
            onClick={closeLightbox}
          >
            <motion.button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                closeLightbox();
              }}
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-xl transition-colors duration-300 hover:bg-white/15"
              aria-label="Close gallery"
            >
              <X size={20} />
            </motion.button>

            {filteredImages.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPreviousImage();
                }}
                className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-xl transition-all duration-300 hover:bg-[#d4af67] hover:text-black sm:left-8 sm:h-14 sm:w-14"
                aria-label="Previous image"
              >
                <ArrowLeft size={20} />
              </button>
            )}

            <motion.div
              key={selectedImage.id}
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(event) => event.stopPropagation()}
              className="relative h-[72vh] w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b0a]"
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />

              <div className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-5 bg-gradient-to-t from-black/90 to-transparent px-6 pb-6 pt-20 sm:px-10 sm:pb-9">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4af67]">
                    {selectedImage.category}
                  </span>

                  <h3 className="mt-3 text-xl font-light text-white sm:text-3xl">
                    {selectedImage.alt}
                  </h3>
                </div>

                <span className="text-xs tracking-[0.2em] text-white/45">
                  {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                  {String(filteredImages.length).padStart(2, "0")}
                </span>
              </div>
            </motion.div>

            {filteredImages.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNextImage();
                }}
                className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-xl transition-all duration-300 hover:bg-[#d4af67] hover:text-black sm:right-8 sm:h-14 sm:w-14"
                aria-label="Next image"
              >
                <ArrowRight size={20} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}