import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { wedding } from "@/data/wedding";
import { Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden bg-background px-5 py-28 sm:px-8 md:py-40">
      <div className="relative mx-auto max-w-4xl">
        {/* <SectionHeading eyebrow="Hour by hour" title="The Timeline" script="our day" /> */}

        <div ref={ref} className="relative mt-20 pl-10 sm:pl-0">
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[7px] w-px bg-gold/20 sm:left-1/2 sm:-translate-x-1/2"
          />
          <motion.div
            aria-hidden
            style={reduced ? { height: "100%" } : { height }}
            className="absolute top-0 left-[7px] w-px bg-gradient-to-b from-gold/10 via-gold to-gold/10 shadow-[0_0_16px_2px_color-mix(in_oklab,var(--gold)_45%,transparent)] sm:left-1/2 sm:-translate-x-1/2"
          />

          <ol className="space-y-14">
            {wedding.timeline.map((item, i) => {
              const right = i % 2 === 1;
              return (
                <li key={item.time} className="relative sm:grid sm:grid-cols-2 sm:gap-14">
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-2 -left-[33px] h-[15px] w-[15px] rounded-full border border-gold bg-background shadow-[0_0_14px_2px_color-mix(in_oklab,var(--gold)_45%,transparent)] sm:left-1/2 sm:-translate-x-1/2"
                  />
                  <Reveal
                    delay={0.05}
                    className={cn(
                      "sm:col-start-1",
                      right ? "sm:col-start-2 sm:text-left" : "sm:text-right",
                    )}
                  >
                    <div className="group min-w-0">
                      <p className="font-serif text-3xl text-gold-deep transition-colors group-hover:text-gold sm:text-4xl">
                        {item.time}
                      </p>
                      <h3 className="mt-2 font-serif text-xl text-navy-deep">{item.label}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
