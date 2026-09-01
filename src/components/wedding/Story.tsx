import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { wedding } from "@/data/wedding";
import { Reveal, SectionHeading } from "./primitives";
import couple from "@/assets/couple-main.jpg";

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section id="story" className="relative overflow-hidden bg-background px-5 py-28 sm:px-8 md:py-40">
      <div
        aria-hidden
        className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--dusty-soft), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="How it began" title="Our Story" script="the two of us" />

        <div ref={ref} className="mt-20 grid gap-14 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:items-center md:gap-20">
          <Reveal y={40}>
            <div className="relative">
              <span
                aria-hidden
                className="absolute -top-5 -left-5 h-28 w-28 border-t border-l border-gold/60"
              />
              <span
                aria-hidden
                className="absolute -right-5 -bottom-5 h-28 w-28 border-r border-b border-gold/60"
              />
              <div className="relative overflow-hidden">
                <motion.img
                  src={couple}
                  alt="Elena and Alexander on the villa terrace"
                  loading="lazy"
                  width={1200}
                  height={1504}
                  style={reduced ? {} : { y: imageY, scale }}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div>
            {wedding.story.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p className="mb-6 text-base leading-[1.9] text-muted-foreground">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2} className="mt-10">
              <span className="gold-rule block" />
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {wedding.story.milestones.map((m, i) => (
                <Reveal key={m.year} delay={0.08 * i}>
                  <div className="min-w-0">
                    <p className="font-serif text-3xl text-gold-deep">{m.year}</p>
                    <p className="mt-2 text-xs leading-relaxed tracking-wide text-navy/70">
                      {m.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
