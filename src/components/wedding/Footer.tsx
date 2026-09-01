import { motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { GoldParticles, Petals } from "./Effects";
import { FloralFrame } from "./Hero";
import { LetterReveal, Ornament, Reveal } from "./primitives";

export function Footer() {
  const reduced = useReducedMotion();

  return (
    <footer className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ivory px-5 py-28">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 75% at 50% 45%, color-mix(in oklab, white 92%, transparent), transparent 72%), radial-gradient(80% 55% at 50% 0%, color-mix(in oklab, var(--dusty-soft) 65%, transparent), transparent)",
        }}
      />
      <FloralFrame opacity={0.85} />
      <GoldParticles count={18} />
      <Petals count={8} />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow">С любов</p>
        </Reveal>

        <h2 className="mt-8 flex flex-col items-center leading-[0.95] text-navy-deep">
          <span className="text-[clamp(2.6rem,11vw,6rem)]">
            <LetterReveal text={wedding.bride} stagger={0.05} />
          </span>
          <span className="font-script my-1 text-[clamp(1.8rem,6vw,3.4rem)] text-gold">
            &amp;
          </span>
          <span className="text-[clamp(2.6rem,11vw,6rem)]">
            <LetterReveal text={wedding.groom} stagger={0.05} />
          </span>
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-8 text-[0.75rem] tracking-[0.42em] text-navy uppercase">
            {wedding.dateLong}
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-8">
          <Ornament />
        </Reveal>

        <Reveal delay={0.4}>
          <p className="font-script mt-8 text-3xl text-gold-deep sm:text-2xl">
            Благодарим Ви, че сте част от нашата история.
          </p>
        </Reveal>

        <motion.svg
          viewBox="0 0 24 24"
          className="mt-12 h-6 w-6 text-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          aria-hidden
          animate={reduced ? {} : { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 20.5 4.4 13a4.6 4.6 0 0 1 6.5-6.5l1.1 1.1 1.1-1.1A4.6 4.6 0 0 1 19.6 13Z" />
        </motion.svg>

        <p className="mt-10 text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
          {wedding.dateShort}
        </p>
      </div>
    </footer>
  );
}
