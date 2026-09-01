import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { wedding } from "@/data/wedding";
import { GoldParticles, Petals } from "./Effects";
import { Ornament } from "./primitives";
import topLeft from "@/assets/floral-corner-top-left.png.asset.json";
import bottomRight from "@/assets/floral-corner-bottom-right.png.asset.json";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Overture({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  const handle = () => {
    setOpen(true);
    window.setTimeout(onOpen, reduced ? 150 : 1500);
  };

  return (
    <AnimatePresence>
      {!open || reduced ? (
        <motion.div
          key="overture"
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-ivory px-6"
          exit={
            reduced
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.14, filter: "blur(14px)" }
          }
          transition={{ duration: 1.5, ease: EASE }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(160% 120% at 50% 25%, color-mix(in oklab, lightblue 100%, transparent), transparent 70%), radial-gradient(90% 60% at 50% 110%, color-mix(in oklab, white 70%, transparent), transparent)",
            }}
          />
          <img
            src={topLeft.url}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -top-8 -left-12 w-[64vw] max-w-[520px] opacity-90 md:w-[38vw]"
          />
          <img
            src={bottomRight.url}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-12 -bottom-10 w-[64vw] max-w-[520px] opacity-90 md:w-[38vw]"
          />
          <GoldParticles count={16} />
          {open ? <Petals count={22} /> : null}

          <motion.div
            className="relative z-10 flex flex-col items-center text-center"
            animate={open && !reduced ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
              className="eyebrow"
            >
              Покана
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
              className="mt-6 font-serif text-[clamp(2.6rem,10vw,5.5rem)] leading-[1.05] text-navy-deep"
            >
              {wedding.bride}
              <span className="font-script mx-3 text-gold">&amp;</span>
              {wedding.groom}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="mt-6 flex flex-col items-center"
            >
              <Ornament className="w-40" />
              <p className="mt-5 text-[0.72rem] tracking-[0.4em] text-navy uppercase">
                {wedding.dateLong}
              </p>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {wedding.invitation}
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={handle}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.4, ease: EASE }}
              className="btn-gold-solid mt-12 cursor-pointer"
            >
              Детайли
            </motion.button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
