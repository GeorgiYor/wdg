import { z } from "zod";

export const rsvpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please tell us your name" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255),
  guests: z.coerce
    .number()
    .int()
    .min(1, { message: "At least one guest" })
    .max(10, { message: "Please contact us for larger parties" }),
  attendance: z.enum(["accept", "decline"]),
  dietary: z.string().trim().max(300).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

/**
 * Frontend-only stub. Swap the body for a server function / email service
 * (e.g. a createServerFn call) when a backend is connected — the signature
 * and validation contract stay the same.
 */
export async function submitRsvp(data: RsvpInput): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  if (import.meta.env.DEV) console.info("RSVP submitted (local only):", data);
  return { ok: true };
}
