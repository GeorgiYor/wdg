import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState, type FormEvent } from "react";
import { rsvpSchema, submitRsvp, type RsvpInput } from "@/lib/rsvp";
import { GoldParticles } from "./Effects";
import { Ornament, Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<keyof RsvpInput, string>>;

export function RSVP() {
  const [attendance, setAttendance] = useState<"accept" | "decline">("accept");
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = rsvpSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      guests: form.get("guests"),
      attendance,
      dietary: form.get("dietary") ?? "",
      message: form.get("message") ?? "",
    });

    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof RsvpInput;
        if (!next[key]) next[key] = issue.message;
      });
      setErrors(next);
      return;
    }

    setErrors({});
    setPending(true);
    await submitRsvp(parsed.data);
    setPending(false);
    setDone(true);
  };

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-navy-deep px-5 py-28 sm:px-8 md:py-40"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(80% 55% at 50% 0%, color-mix(in oklab, var(--sapphire) 45%, transparent), transparent 70%)",
        }}
      />
      <GoldParticles count={20} />

      <div className="relative mx-auto max-w-2xl">
        <SectionHeading eyebrow="RSVP" title="Will You Join Us?" light />

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 flex flex-col items-center text-center"
            >
              <motion.span
                animate={{ scale: [1, 1.14, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="h-10 w-10 text-gold" strokeWidth={0.9} />
              </motion.span>
              <p className="font-script mt-8 text-4xl text-gold sm:text-5xl">
                Thank you!
              </p>
              <p className="mt-5 text-base text-ivory/80">
                We can&apos;t wait to celebrate with you.
              </p>
              <Ornament className="mt-8 text-gold-light" />
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5 }}
              noValidate
              className="mt-16 grid gap-8 sm:grid-cols-2"
            >
              <Field label="Name" error={errors.name}>
                <input
                  name="name"
                  className="field-elegant text-ivory"
                  placeholder="Your full name"
                  maxLength={100}
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  name="email"
                  type="email"
                  className="field-elegant text-ivory"
                  placeholder="you@example.com"
                  maxLength={255}
                />
              </Field>

              <Field label="Number of guests" error={errors.guests}>
                <input
                  name="guests"
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={1}
                  className="field-elegant text-ivory"
                />
              </Field>

              <Field label="Attendance">
                <div className="mt-2 flex flex-wrap gap-3">
                  {(
                    [
                      ["accept", "Joyfully Accept"],
                      ["decline", "Regretfully Decline"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAttendance(value)}
                      className={cn(
                        "border px-4 py-2.5 text-[0.62rem] tracking-[0.22em] uppercase transition-all duration-500",
                        attendance === value
                          ? "border-gold bg-gold/15 text-gold-light shadow-[0_0_24px_-6px_color-mix(in_oklab,var(--gold)_70%,transparent)]"
                          : "border-ivory/25 text-ivory/60 hover:border-gold/60 hover:text-gold-light",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Dietary requirements (optional)" className="sm:col-span-2">
                <input
                  name="dietary"
                  className="field-elegant text-ivory"
                  placeholder="Vegetarian, allergies…"
                  maxLength={300}
                />
              </Field>

              <Field label="Message to the couple" className="sm:col-span-2">
                <textarea
                  name="message"
                  rows={3}
                  className="field-elegant resize-none text-ivory"
                  placeholder="A few words we'll keep forever"
                  maxLength={1000}
                />
              </Field>

              <div className="sm:col-span-2 sm:justify-self-center">
                <button type="submit" disabled={pending} className="btn-gold-solid w-full sm:w-auto">
                  {pending ? "Sending…" : "Send RSVP"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
  className?: string | undefined;
}) {
  return (
    <Reveal className={className}>
      <label className="block">
        <span className="text-[0.6rem] tracking-[0.3em] text-ivory/55 uppercase">
          {label}
        </span>
        <div className="mt-1">{children}</div>
        {error ? <p className="mt-2 text-xs text-blush">{error}</p> : null}
      </label>
    </Reveal>
  );
}
