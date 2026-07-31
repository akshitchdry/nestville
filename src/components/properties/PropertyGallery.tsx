"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Images,
  X,
} from "lucide-react";
import { useEffect , useState } from "react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  label?: string;
}

interface PropertyGalleryProps {
  images?: GalleryImage[];
  title?: string;
}

const defaultImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/properties/gallery/gallery-1.jpg",
    alt: "Luxury villa exterior",
    label: "Exterior",
  },
  {
    id: 2,
    src: "/images/properties/gallery/gallery-2.jpg",
    alt: "Luxury living room",
    label: "Living Room",
  },
  {
    id: 3,
    src: "/images/properties/gallery/gallery-3.jpg",
    alt: "Modern luxury bedroom",
    label: "Master Bedroom",
  },
  {
    id: 4,
    src: "/images/properties/gallery/gallery-4.jpg",
    alt: "Private infinity pool",
    label: "Infinity Pool",
  },
  {
    id: 5,
    src: "/images/properties/gallery/gallery-5.jpg",
    alt: "Luxury modular kitchen",
    label: "Kitchen",
  },
  {
    id: 6,
    src: "/images/properties/gallery/gallery-6.jpg",
    alt: "Private landscaped garden",
    label: "Garden",
  },
];

export default function PropertyGallery({
  images = defaultImages,
  title = "Royal Palm Villa",
}: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isLightboxOpen = activeIndex !== null;

  function openLightbox(index: number) {
    setActiveIndex(index);
  }

  function closeLightbox() {
    setActiveIndex(null);
  }

  function showPrevious() {
    if (activeIndex === null) return;

    setActiveIndex(
      activeIndex === 0 ? images.length - 1 : activeIndex - 1,
    );
  }

  function showNext() {
    if (activeIndex === null) return;

    setActiveIndex(
      activeIndex === images.length - 1 ? 0 : activeIndex + 1,
    );
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isLightboxOpen) return;

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, isLightboxOpen]);

  if (!images.length) {
    return null;
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#050505] py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-170px] top-20 h-[430px] w-[430px] rounded-full bg-[#d4af67]/10 blur-[180px]" />

          <div className="absolute bottom-0 right-[-180px] h-[430px] w-[430px] rounded-full bg-[#d4af67]/10 blur-[180px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
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
            className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <Images size={17} className="text-[#d4af67]" />

                <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af67]">
                  Property Gallery
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl">
                Explore Every Detail of
                <span className="block text-[#d4af67]">
                  {title}
                </span>
              </h2>

              <p className="mt-6 max-w-2xl leading-8 text-white/50">
                Discover carefully designed interiors, architectural details
                and private spaces crafted for an elevated living experience.
              </p>
            </div>

            <div
              className="
                inline-flex
                w-fit
                items-center
                gap-3
                rounded-full
                border
                border-white/10
                bg-white/[0.035]
                px-5
                py-3
                backdrop-blur-xl
              "
            >
              <span className="text-2xl font-light text-white">
                {String(images.length).padStart(2, "0")}
              </span>

              <span className="text-[9px] uppercase tracking-[0.26em] text-white/35">
                Gallery Images
              </span>
            </div>
          </motion.div>

          <div className="mt-16 grid auto-rows-[220px] gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[185px]">
            {images.map((image, index) => {
              const desktopLayout = [
                "lg:col-span-7 lg:row-span-3",
                "lg:col-span-5 lg:row-span-2",
                "lg:col-span-5 lg:row-span-2",
                "lg:col-span-4 lg:row-span-2",
                "lg:col-span-4 lg:row-span-2",
                "lg:col-span-4 lg:row-span-2",
              ];

              return (
                <motion.button
                  key={image.id}
                  type="button"
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => openLightbox(index)}
                  className={`
                    group
                    relative
                    min-h-[220px]
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/[0.08]
                    bg-[#101010]
                    text-left
                    ${desktopLayout[index] ?? "lg:col-span-4 lg:row-span-2"}
                  `}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    className="
                      object-cover
                      transition-transform
                      duration-[1400ms]
                      ease-out
                      group-hover:scale-[1.08]
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10" />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-[#d4af67]/0
                      transition-colors
                      duration-500
                      group-hover:bg-[#d4af67]/10
                    "
                  />

                  <div className="absolute left-5 top-5">
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        border
                        border-white/15
                        bg-black/25
                        px-4
                        py-2
                        text-[9px]
                        uppercase
                        tracking-[0.24em]
                        text-white/70
                        backdrop-blur-xl
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div
                    className="
                      absolute
                      right-5
                      top-5
                      flex
                      h-11
                      w-11
                      scale-90
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/15
                      bg-black/25
                      text-white
                      opacity-0
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      group-hover:scale-100
                      group-hover:opacity-100
                    "
                  >
                    <Expand size={17} />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end justify-between gap-5">
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af67]">
                          View Space
                        </span>

                        <h3 className="mt-2 text-xl font-light text-white sm:text-2xl">
                          {image.label ?? image.alt}
                        </h3>
                      </div>

                      <div
                        className="
                          h-px
                          w-14
                          origin-right
                          scale-x-50
                          bg-[#d4af67]
                          transition-transform
                          duration-500
                          group-hover:scale-x-100
                        "
                      />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isLightboxOpen && activeIndex !== null && (
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
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              bg-black/95
              px-4
              py-6
              backdrop-blur-2xl
              sm:px-8
            "
            onClick={closeLightbox}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af67]/10 blur-[220px]" />
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close gallery"
              className="
                absolute
                right-5
                top-5
                z-20
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-white/[0.06]
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#d4af67]
                hover:bg-[#d4af67]
                hover:text-black
                sm:right-8
                sm:top-8
              "
            >
              <X size={20} />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous image"
              className="
                absolute
                left-3
                top-1/2
                z-20
                flex
                h-12
                w-12
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-black/35
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#d4af67]
                hover:bg-[#d4af67]
                hover:text-black
                sm:left-8
                sm:h-14
                sm:w-14
              "
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="
                absolute
                right-3
                top-1/2
                z-20
                flex
                h-12
                w-12
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-black/35
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#d4af67]
                hover:bg-[#d4af67]
                hover:text-black
                sm:right-8
                sm:h-14
                sm:w-14
              "
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={images[activeIndex].id}
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(event) => event.stopPropagation()}
              className="
                relative
                z-10
                flex
                h-full
                max-h-[88vh]
                w-full
                max-w-[1350px]
                flex-col
                overflow-hidden
                rounded-[26px]
                border
                border-white/10
                bg-[#090909]
                shadow-[0_40px_140px_rgba(0,0,0,0.75)]
              "
            >
              <div className="relative min-h-0 flex-1">
                <Image
                  src={images[activeIndex].src}
                  alt={images[activeIndex].alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <div
                className="
                  flex
                  flex-col
                  gap-5
                  border-t
                  border-white/10
                  bg-black/60
                  px-6
                  py-5
                  backdrop-blur-xl
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af67]">
                    {String(activeIndex + 1).padStart(2, "0")}
                    {" / "}
                    {String(images.length).padStart(2, "0")}
                  </span>

                  <h3 className="mt-2 text-xl font-light text-white sm:text-2xl">
                    {images[activeIndex].label ??
                      images[activeIndex].alt}
                  </h3>
                </div>

                <div className="flex max-w-full gap-3 overflow-x-auto pb-1">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Open ${image.alt}`}
                      className={`
                        relative
                        h-14
                        w-20
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        border
                        transition-all
                        duration-300
                        ${
                          activeIndex === index
                            ? "border-[#d4af67] opacity-100"
                            : "border-white/10 opacity-45 hover:opacity-80"
                        }
                      `}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />

                      {activeIndex === index && (
                        <span className="absolute inset-0 bg-[#d4af67]/10" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}