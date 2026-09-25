import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.email("Enter an email address like name@example.com"),
});

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  phone: z.string().trim().min(7, "Enter a phone number we can call"),
  email: z.email("Enter an email address like name@example.com"),
  occasion: z.string().min(1, "Choose the kind of event"),
  date: z.string().min(1, "Pick a date, even a rough one"),
  guests: z.coerce.number<string>().int().min(10, "At least 10 guests").max(1000, "The hall holds up to 1,000"),
  message: z.string().max(1000).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;
