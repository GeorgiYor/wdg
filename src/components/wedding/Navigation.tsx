import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { id: "home", label: "Начало" },
  { id: "story", label: "" },
  { id: "schedule", label: "Денят ни" },
  { id: "gallery", label: "" },
  { id: "location", label: "Локация" },
  { id: "rsvp", label: "" },
];

export function Navigation() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-700",
          scrolled
            ? "bg-ivory/80 py-3 shadow-[0_1px_0_0_color-mix(in_oklab,var(--gold)_28%,transparent)] backdrop-blur-xl"
            : "bg-transparent py-6",
        )}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8">
          <a
            href="#home"
            className="font-script min-w-0 truncate text-2xl text-navy-deep transition-colors hover:text-gold-deep"
          >
            S <span className="text-gold">&amp;</span> G
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="group relative block py-1 text-[0.68rem] tracking-[0.28em] text-navy uppercase transition-colors hover:text-gold-deep"
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100",
                      active === link.id && "scale-x-100",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="shrink-0 border border-gold/50 p-2.5 text-navy transition-colors hover:bg-gold/10 lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-ivory/97 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-end px-5 py-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="border border-gold/50 p-2.5 text-navy"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="mt-10 flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="font-serif text-3xl text-navy-deep"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-14 flex justify-center">
              <span className="gold-rule block w-40" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
