import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LetterReveal, Ornament } from "./primitives";
import cinematic from "@/assets/Collage3.png";

export function Cinematic() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92svh] items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        aria-hidden
        style={reduced ? {} : { scale, y }}
        className="absolute inset-[-1%]"
      >
        <img
          src={cinematic}
          alt=""
          loading="lazy"
          width={1920}
          height={1180}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--navy-deep) 82%, transparent), color-mix(in oklab, var(--navy-deep) 62%, transparent) 45%, color-mix(in oklab, var(--navy-deep) 88%, transparent))",
        }}
      />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <Ornament className="text-gold-light" />

        <h2 className="mt-8 font-serif text-[clamp(2rem,7vw,4.5rem)] leading-[1.15] text-ivory">
          <LetterReveal
            text="И така нашата история започва."
            stagger={0.03}
          />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.8 }}
          className="mt-8 text-[0.7rem] tracking-[0.42em] text-gold-light uppercase"
        >
          21.08.2027
        </motion.p>
      </div>

    </section>
  );
}
