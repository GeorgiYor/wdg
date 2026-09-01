import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { wedding } from "@/data/wedding";
import { GoldParticles, Petals } from "./Effects";
import { LetterReveal, Ornament } from "./primitives";
import topLeft from "@/assets/flowers.png";
import bottomRight from "@/assets/flowersbottom.png";
import us from "@/assets/photo1.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FloralFrame({ opacity = 1 }: { opacity?: number }) {
  const reduced = useReducedMotion();
  return (
    <>
      <motion.img
        src={topLeft}
        alt=""
        aria-hidden
        width={1600}
        height={1500}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.12, x: -30, y: -30 }}
        animate={{ opacity, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 2.2, ease: EASE }}
        className="pointer-events-none absolute -top-10 -left-14 w-[68vw] max-w-[560px] select-none sm:-top-16 sm:-left-16 md:w-[42vw]"
      />
      <motion.img
        src={bottomRight}
        alt=""
        aria-hidden
        width={1600}
        height={1500}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.12, x: 30, y: 30 }}
        animate={{ opacity, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 2.2, delay: 0.15, ease: EASE }}
        className="pointer-events-none absolute -right-14 -bottom-12 w-[68vw] max-w-[560px] select-none sm:-right-16 sm:-bottom-16 md:w-[42vw]"
      />
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ivory px-5 py-28"
    >

    <div
      aria-hidden
      className="absolute inset-0 bg-cover bg-center opacity-80"
      style={{
        backgroundImage: `url(${us})`,
      }}
    />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 25%, color-mix(in oklab, white 90%, transparent), transparent 70%), radial-gradient(90% 60% at 50% 110%, color-mix(in oklab, var(--dusty-soft) 70%, transparent), transparent)",
        }}
      />

      <FloralFrame />
      <GoldParticles count={22} />
      <Petals count={9} />

      <motion.div
        style={reduced ? {} : { y, opacity }}
        className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          className="eyebrow"
        >
          Сватбата на
        </motion.p>

        <h1 className="mt-8 flex flex-col items-center leading-[0.95] text-navy-deep">
          <span className="text-[clamp(3rem,13vw,7.5rem)] font-light tracking-[0.01em]">
            <LetterReveal text={wedding.bride} stagger={0.06} delay={0.4} />
          </span>
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
            className="font-script my-1 text-[clamp(2rem,7vw,4rem)] text-gold"
          >
            &amp;
          </motion.span>
          <span className="text-[clamp(3rem,13vw,7.5rem)] font-light tracking-[0.01em]">
            <LetterReveal text={wedding.groom} stagger={0.06} delay={1.05} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6 }}
          className="mt-10 flex flex-col items-center"
        >
          <Ornament />
          <p className="mt-6 text-[0.78rem] tracking-[0.42em] text-navy uppercase">
            {wedding.dateLong}
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            {wedding.invitation}
          </p>
        </motion.div>
      </motion.div>

      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-gold-deep"
        aria-label="Scroll to our story"
      >
        <span className="text-[0.6rem] tracking-[0.35em] uppercase"></span>
        <motion.span
          animate={reduced ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
