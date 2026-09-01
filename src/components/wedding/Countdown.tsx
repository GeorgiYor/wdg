import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import { GoldParticles } from "./Effects";
import { Reveal, SectionHeading } from "./primitives";

const target = new Date(wedding.dateISO).getTime();

function diff() {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  return {
    Days: Math.floor(ms / 86400000),
    Hours: Math.floor((ms / 3600000) % 24),
    Minutes: Math.floor((ms / 60000) % 60),
    Seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof diff>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(diff());
    const id = window.setInterval(() => setTime(diff()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-navy-deep px-5 py-28 sm:px-8 md:py-36">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(90% 60% at 50% 0%, color-mix(in oklab, var(--sapphire) 55%, transparent), transparent 70%), radial-gradient(70% 50% at 20% 100%, color-mix(in oklab, var(--navy) 70%, transparent), transparent)",
        }}
      />
      <GoldParticles count={26} />

      <div className="relative mx-auto max-w-4xl break-normal [overflow-wrap:normal]">
        <SectionHeading eyebrow="Save the date" title="Counting Down to Forever" light />

        {mounted && !time ? (
          <Reveal className="mt-16 text-center">
            <p className="font-script text-5xl text-gold sm:text-7xl">Днес е големият ден</p>
          </Reveal>
        ) : (
          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
            {(["Days", "Hours", "Minutes", "Seconds"] as const).map((unit, i) => (
              <Reveal key={unit} delay={i * 0.08}>
                <div className="relative flex flex-col items-center">
                  <motion.span
                    key={time ? time[unit] : unit}
                    initial={{ opacity: 0.4, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-serif text-[clamp(2.8rem,10vw,5rem)] leading-none text-gold-gradient"
                  >
                    {time ? String(time[unit]).padStart(2, "0") : "--"}
                  </motion.span>
                  <span className="mt-4 text-[0.62rem] tracking-[0.42em] text-ivory/60 uppercase">
                    {unit}
                  </span>
                  {i < 3 ? (
                    <span
                      aria-hidden
                      className="absolute top-2 -right-3 hidden h-16 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent sm:block"
                    />
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
