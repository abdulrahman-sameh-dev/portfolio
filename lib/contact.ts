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
  architecture: {
    category: "Consultation",
    message:
      "I'd like to initiate an Architecture & System Design engagement. I'm looking for end-to-end architecture that starts with data contracts and ends with a clear deployment path, production-ready before a single UI pixel ships.",
  },
  build: {
    category: "Project",
    message:
      "I'd like to initiate a Full-Stack Product Build engagement. I'd like to take a project from greenfield to shipped, owning the full vertical slice — schema, API, interface, and deployment as one coherent system.",
  },
  audit: {
    category: "Consultation",
    message:
      "I'd like to initiate a Performance & Reliability Audit engagement. I'd like a forensic pass over latency, bundle weight, and failure modes, with a prioritized remediation plan I can act on.",
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
