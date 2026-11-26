import { z } from "zod";

export const contactCategories = [
  "Project",
  "Consultation",
  "Collaboration",
  "Other",
] as const;

export type ContactProtocol = {
  category: (typeof contactCategories)[number];
  message: string;
};

export const REQUEST_PROTOCOL_EVENT = "request-protocol";

export type RequestProtocolDetail = ContactProtocol & { service: string };

export const serviceProtocolToContact: Record<string, ContactProtocol> = {
  build: {
    category: "Project",
    message:
      "I'd like to talk about building a web application. I'm looking for help from the interface through the API and database, with a clear deployment path and code that is easy to maintain.",
  },
  planning: {
    category: "Consultation",
    message:
      "I'd like help clarifying a product idea. I need support defining the problem, setting scope, and splitting the work into milestones before development starts.",
  },
  improve: {
    category: "Consultation",
    message:
      "I'd like a practical review of an existing application. I'm interested in usability, performance, and deployment issues, with a short list of fixes I can act on.",
  },
};

export const contactFormSchema = z
  .object({
    firstName: z.string().trim().min(2, "First name is required").max(80),
    lastName: z.string().trim().min(2, "Last name is required").max(80),
    email: z.string().trim().email("Invalid email address").max(254),
    phone: z.string().trim().max(50).optional(),
    category: z.enum(contactCategories, {
      message: "Please select a category",
    }),
    message: z
      .string()
      .trim()
      .min(10, "Message must be at least 10 characters")
      .max(5000, "Message is too long"),
  })
  .strict();

export type ContactFormValues = z.infer<typeof contactFormSchema>;
