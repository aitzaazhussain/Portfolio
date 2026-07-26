import { z } from "zod";

/**
 * Single source of truth for contact-form validation. Imported by both the
 * client-side form (for inline errors) and the /api/contact route handler
 * (for the real, trust-nothing server-side check). Never rely on client
 * validation alone — the API route re-validates everything.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  // Email validation:
// - Checks valid email format
// - Limits maximum length
// - Blocks temporary/disposable email providers commonly used by spam bots
email: z
  .string()
  .trim()
  .email("Please enter a valid email address")
  .max(200)
  .refine(
    (email) => {
      const blockedDomains = [
        "mailinator.com",
        "guerrillamail.com",
        "10minutemail.com",
        "tempmail.com",
      ];

      // Extract domain part after "@"
      const domain = email.split("@")[1]?.toLowerCase();

      // Allow normal emails, reject disposable email services
      return !blockedDomains.includes(domain);
    },
    {
      message: "Temporary email addresses are not allowed",
    },
  ),
  budget: z.string().trim().max(60).optional().default(""),
  projectType: z.string().trim().max(60).optional().default(""),
  // Message validation:
  // - Requires minimum length
  // - Requires meaningful word count
  // - Blocks repeated/gibberish messages
  // - Prevents users from submitting empty or useless descriptions
  message: z
    .string()
    .trim()
    .min(30, "Please provide more project details")
    .max(4000)
    .refine((value) => value.trim().split(/\s+/).length >= 8, {
      message: "Please provide a meaningful project description",
    })
    .refine(
      (value) => {
        const words = value.toLowerCase().split(/\s+/);

        // Check that the message contains enough unique words
        // to avoid spam like "test test test test"
        const uniqueWords = new Set(words);

        return uniqueWords.size >= 4;
      },
      {
        message: "Please avoid repeated or meaningless words",
      },
    ),
  // Honeypot field. Renamed away from "company" — that name is specifically
  // targeted by Chrome/address autofill even on visually-hidden fields,
  // which was causing real submissions to get flagged. No length constraint
  // here on purpose: this must never produce a user-visible validation
  // error. The API route reads this value and silently drops bot
  // submissions server-side instead (see app/api/contact/route.ts) — that
  // is the only place a filled honeypot should have any effect.
  hp: z.string().optional().default(""),
  // Timestamp (ms) the form was rendered, sent back on submit. Submissions
  // faster than ~2s are almost always bots filling the form programmatically.
  renderedAt: z.number().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
