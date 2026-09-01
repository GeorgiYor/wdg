import { Church, Clock, MapPin, Sparkles } from "lucide-react";
import { wedding } from "@/data/wedding";
import { Reveal, SectionHeading } from "./primitives";

const cards = [
  { ...wedding.ceremony, Icon: Church },
  { ...wedding.reception, Icon: Sparkles },
];

export function Details() {
  return (
    <section
      id="schedule"
      className="relative overflow-hidden bg-secondary/50 px-5 py-28 sm:px-8 md:py-40"
    >
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading eyebrow="Детайли за" title="Денят ни" script="" />

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.12} y={40}>
              <article className="card-elegant h-full px-8 py-12 text-center sm:px-12">
                <card.Icon className="mx-auto h-7 w-7 text-gold" strokeWidth={1} />
                <h3 className="mt-6 font-serif text-3xl text-navy-deep">{card.title}</h3>
                <span className="gold-rule mx-auto mt-6 block w-24" />
                <p className="mt-6 text-[0.72rem] tracking-[0.32em] text-navy/70 uppercase">
                  {card.date}
                </p>
                <p className="mt-5 flex items-center justify-center gap-2 font-serif text-4xl text-gold-deep">
                  <Clock className="h-4 w-4" strokeWidth={1} />
                  {card.time}
                </p>
                <p className="mt-6 font-serif text-xl text-navy-deep">{card.venue}</p>
                <p className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.2} />
                  {card.address}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
