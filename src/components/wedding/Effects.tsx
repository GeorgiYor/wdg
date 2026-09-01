import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

function useClient() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}

/** Extremely subtle drifting gold light motes. */
export function GoldParticles({
  count = 18,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ready = useClient();
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 37 + 11) % 100,
        top: (i * 53 + 23) % 100,
        size: 1.5 + ((i * 7) % 4),
        delay: (i * 1.37) % 12,
        duration: 12 + ((i * 3) % 10),
        drift: ((i % 5) - 2) * 24,
      })),
    [count],
  );

  if (!ready || reduced) return null;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {motes.map((m, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            opacity: 0,
            filter: "blur(0.4px)",
            boxShadow: "0 0 8px 2px color-mix(in oklab, var(--gold) 45%, transparent)",
            animation: `sparkle-float ${m.duration}s ${m.delay}s infinite ease-in-out`,
            ["--drift" as string]: `${m.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

/** Slow-drifting watercolour petals in soft blue and blush. */
export function Petals({
  count = 12,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ready = useClient();
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 61 + 7) % 100,
        scale: 0.55 + ((i * 13) % 60) / 100,
        delay: (i * 2.7) % 26,
        duration: 22 + ((i * 5) % 16),
        drift: ((i % 6) - 3) * 42,
        blush: i % 3 === 0,
        rotate: (i * 47) % 360,
      })),
    [count],
  );

  if (!ready || reduced) return null;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {petals.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={cn("absolute h-5 w-5", p.blush ? "text-blush" : "text-dusty")}
          style={{
            left: `${p.left}%`,
            top: 0,
            opacity: 0,
            transform: `scale(${p.scale}) rotate(${p.rotate}deg)`,
            animation: `petal-fall ${p.duration}s ${p.delay}s infinite linear`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        >
          <path
            fill="currentColor"
            fillOpacity="0.65"
            d="M12 2c4.5 3.2 8 7 8 11.2C20 18 16.4 22 12 22S4 18 4 13.2C4 9 7.5 5.2 12 2Z"
          />
        </svg>
      ))}
    </div>
  );
}

/** Faint film-grain / paper texture overlay for the luxe print feel. */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] opacity-[0.035] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
