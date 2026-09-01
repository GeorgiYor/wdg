import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Overture } from "@/components/wedding/Overture";
import { Navigation } from "@/components/wedding/Navigation";
import { SmoothScroll } from "@/components/wedding/SmoothScroll";
import { Hero } from "@/components/wedding/Hero";
import { Story } from "@/components/wedding/Story";
import { Countdown } from "@/components/wedding/Countdown";
import { Details } from "@/components/wedding/Details";
import { Timeline } from "@/components/wedding/Timeline";
import { Gallery } from "@/components/wedding/Gallery";
import { Cinematic } from "@/components/wedding/Cinematic";
import { Location } from "@/components/wedding/Location";
import { DressCode } from "@/components/wedding/DressCode";
import { RSVP } from "@/components/wedding/RSVP";
import { Footer } from "@/components/wedding/Footer";
import { GrainOverlay } from "@/components/wedding/Effects";
import { wedding } from "@/data/wedding";

const title = `${wedding.bride} & ${wedding.groom}`;
const description = `Join ${wedding.bride} and ${wedding.groom} at ${wedding.location.venue} on ${wedding.dateLong}. Ceremony, schedule, gallery, location and RSVP.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: title,
          startDate: wedding.dateISO,
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: wedding.location.venue,
            address: wedding.location.address,
          },
          description,
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <div className="relative bg-background">
      {!opened ? <Overture onOpen={() => setOpened(true)} /> : null}
      {opened ? (
        <>
          <SmoothScroll />
          <Navigation />
          <main>
            <Hero />
            {/* <Story /> */}
            <Countdown />
            <Details />
            <Timeline />
            {/* <Gallery /> */}
            <Cinematic />
            <Location />
            {/* <DressCode /> */}
            {/* <RSVP /> */}
          </main>
          <Footer />
          <GrainOverlay />
        </>
      ) : null}
    </div>
  );
}
