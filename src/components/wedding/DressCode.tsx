import { wedding } from "@/data/wedding";
import { Reveal } from "./primitives";

export function DressCode() {
  return (
    <section className="relative bg-background px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Reveal>
          <svg
            viewBox="0 0 64 64"
            className="h-16 w-16 text-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden
          >
            <path d="M24 10h16l-2 6 6 30a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6l6-30-2-6Z" />
            <path d="M32 16v30" className="text-navy" stroke="currentColor" />
            <circle cx="32" cy="24" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="32" cy="32" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="32" cy="40" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow mt-8">Dress Code</p>
        </Reveal>
        <Reveal delay={0.16}>
          <h2 className="mt-5 font-serif text-4xl text-navy-deep sm:text-5xl">
            {wedding.dressCode.label}
          </h2>
        </Reveal>
        <Reveal delay={0.22} className="mt-7 w-32">
          <span className="gold-rule block" />
        </Reveal>
        <Reveal delay={0.28}>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-muted-foreground">
            {wedding.dressCode.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
