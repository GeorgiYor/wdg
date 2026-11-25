import { MapPin } from "lucide-react";
import { mapEmbedUrl, mapsUrl, wedding } from "@/data/wedding";
import { Reveal, SectionHeading } from "./primitives";

export function Location() {
  return (
    <section
      id="location"
      className="relative bg-secondary/50 px-5 py-28 sm:px-8 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Къде" title="Локация" script="Hotel Queen" />

        <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <Reveal y={40}>
          <div className="card-elegant px-8 py-12 text-center sm:px-12 lg:text-left">
            {/* MapPin и заглавието на един ред */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-3">
              <MapPin
                className="h-6 w-6 shrink-0 text-gold"
                strokeWidth={1}
              />
              <h3 className="font-serif text-4xl text-navy-deep">
                {wedding.location.venue}
              </h3>
            </div>

            {/* Линията е с пълна ширина (или по-голяма) на телефон и w-24 нагоре */}
            <span className="gold-rule mt-6 block w-full sm:w-48 mx-auto lg:mx-0" />

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {wedding.location.address}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {wedding.location.note}
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-10"
            >
              Отвори в Google Maps
            </a>
          </div>
          </Reveal>

          <Reveal delay={0.15} y={40}>
            <div className="relative border border-gold/40 p-2">
              <iframe
                title="Map to Hotel Queen"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[340px] w-full grayscale-[35%] sm:h-[460px]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
