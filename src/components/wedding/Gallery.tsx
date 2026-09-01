import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Reveal, SectionHeading } from "./primitives";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";
import g7 from "@/assets/g7.jpg";
import g8 from "@/assets/g8.jpg";
import g9 from "@/assets/g9.jpg";
import g10 from "@/assets/g10.jpg";
import g11 from "@/assets/g11.jpg";
import couple from "@/assets/couple-main.jpg";
import venue from "@/assets/venue.jpg";
import cinematic from "@/assets/cinematic-wide.jpg";

const photos = [
  { src: g1, alt: "The bridal bouquet in blue and blush" },
  { src: g6, alt: "The bride by the window" },
  { src: g2, alt: "Reception table setting in blue and gold" },
  { src: g5, alt: "Gold wedding bands on ivory silk" },
  { src: g4, alt: "The ceremony aisle in the garden" },
  { src: g11, alt: "The groom in a navy tuxedo" },
  { src: g9, alt: "Walking the cypress path at golden hour" },
  { src: g7, alt: "The wedding cake" },
  { src: couple, alt: "The couple on the villa terrace" },
  { src: g10, alt: "The invitation suite" },
  { src: g8, alt: "A champagne toast" },
  { src: g3, alt: "The first dance" },
  { src: venue, alt: "Villa Aurora at dusk" },
  { src: cinematic, alt: "The garden under string lights" },
];

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [],
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, next, prev]);

  return (
    <section id="gallery" className="relative bg-background px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Moments" title="The Gallery" script="in pictures" />

        <div className="mt-20 columns-2 gap-4 sm:gap-5 lg:columns-3">
          {photos.map((photo, i) => (
            <Reveal key={photo.src} delay={(i % 3) * 0.08} className="mb-4 sm:mb-5">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden focus:ring-1 focus:ring-gold focus:outline-none"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-2 border border-gold/0 transition-all duration-700 group-hover:inset-3 group-hover:border-gold/70"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-navy-deep/0 transition-colors duration-700 group-hover:bg-navy-deep/15"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {index !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-deep/95 backdrop-blur-md"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="absolute top-5 right-5 border border-gold/50 p-2.5 text-ivory transition-colors hover:bg-gold/20"
            >
              <X className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 z-10 border border-gold/40 p-3 text-ivory transition-colors hover:bg-gold/20 sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <motion.img
              key={index}
              src={photos[index]?.src}
              alt={photos[index]?.alt ?? ""}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] max-w-[88vw] object-contain shadow-[0_40px_120px_-40px_black]"
            />

            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 z-10 border border-gold/40 p-3 text-ivory transition-colors hover:bg-gold/20 sm:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <p className="absolute bottom-6 text-[0.68rem] tracking-[0.3em] text-ivory/60 uppercase">
              {index + 1} / {photos.length}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
