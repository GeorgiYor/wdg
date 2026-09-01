import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  blur = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string | undefined;
  blur?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: reduced ? 0.3 : 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Character-stagger reveal for short, precious lines of text. */
export function LetterReveal({
  text,
  className,
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string | undefined;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;

  const words = text.split(" ");
  let globalIndex = 0;

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {words.map((word, wi) => {
        const wordSpan = (
          <span key={`word-${wi}`} className="inline-block whitespace-nowrap">
            {word.split("").map((char, i) => {
              const idx = globalIndex + i;
              return (
                <motion.span
                  key={`${char}-${idx}`}
                  aria-hidden
                  className="inline-block will-change-transform"
                  initial={{ opacity: 0, y: "0.35em", filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1, delay: delay + idx * stagger, ease: EASE }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
        globalIndex += word.length + 1;
        return wi < words.length - 1 ? (
          <span key={`space-${wi}`}>
            {wordSpan}
            {"\u00A0"}
          </span>
        ) : (
          wordSpan
        );
      })}
    </span>
  );
}

export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? {} : { y }}>{children}</motion.div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  script,
  className,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  className?: string | undefined;
  light?: boolean;
}) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {eyebrow ? (
        <Reveal>
          <p className={cn("eyebrow", light && "text-gold-light")}>{eyebrow}</p>
        </Reveal>
      ) : null}
      <h2
        className={cn(
          "mt-5 text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl",
          light ? "text-ivory" : "text-navy-deep",
        )}
      >
        <LetterReveal text={title} stagger={0.035} />
      </h2>
      {script ? (
        <Reveal delay={0.2}>
          <p className="font-script mt-3 text-2xl text-gold sm:text-3xl">{script}</p>
        </Reveal>
      ) : null}
      <Reveal delay={0.25} className="mt-7 w-40">
        <span className="gold-rule block" />
      </Reveal>
    </div>
  );
}

export function Ornament({ className }: { className?: string | undefined }) {
  return (
    <svg
      viewBox="0 0 220 24"
      className={cn("h-6 w-52 text-gold", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden
    >
      <path d="M0 12h72" />
      <path d="M148 12h72" />
      <path d="M110 4c-7 0-12 3.6-12 8s5 8 12 8 12-3.6 12-8-5-8-12-8Z" />
      <path d="M110 1.5 116 12l-6 10.5L104 12Z" />
      <circle cx="86" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="134" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
