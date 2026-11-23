import { Resend } from "resend";
import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact";

const TEST_SENDER = "Portfolio Contact <onboarding@resend.dev>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IDEMPOTENCY_PATTERN = /^[A-Za-z0-9_-]{1,256}$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function createIdempotencyKey(request: Request): string {
  const requested = request.headers.get("idempotency-key");
  if (requested && IDEMPOTENCY_PATTERN.test(requested)) return requested;
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { error: "Expected a JSON request body." },
      { status: 415 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { error: "The request body could not be read." },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check your details and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, phone, category, message } = parsed.data;

  const from = process.env.RESEND_FROM_EMAIL?.trim() || TEST_SENDER;
  const fromAddress = from.match(/<([^>]+)>/)?.[1]?.trim() ?? from;
  const usesTestSender = /@resend\.dev$/i.test(fromAddress);
  const testRecipient =
    process.env.RESEND_TEST_RECIPIENT?.trim() || "darkness.itec.eg@gmail.com";
  const to =
    process.env.CONTACT_TO_EMAIL?.trim() ||
    (usesTestSender ? testRecipient : fromAddress);

  if (!EMAIL_PATTERN.test(fromAddress) || !EMAIL_PATTERN.test(to)) {
    console.error("[contact] Invalid mail configuration", {
      from: fromAddress,
      to,
    });
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  if (usesTestSender && !process.env.CONTACT_TO_EMAIL) {
    console.warn(
      "[contact] Using Resend test sender; messages will only reach the Resend account address. Set RESEND_FROM_EMAIL to a verified domain and CONTACT_TO_EMAIL for production delivery."
    );
  }

  const safe = {
    firstName: escapeHtml(firstName),
    lastName: escapeHtml(lastName),
    email: escapeHtml(email),
    phone: phone ? escapeHtml(phone) : "",
    category: escapeHtml(category),
    message: escapeHtml(message).replace(/\r?\n/g, "<br />"),
  };

  const resend = new Resend(apiKey);
  const idempotencyKey = createIdempotencyKey(req);

  try {
    const { data, error } = await resend.emails.send(
      {
        from,
        to: [to],
        subject: `New Inquiry: ${safe.category} from ${safe.firstName} ${safe.lastName}`,
        replyTo: email,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${safe.firstName} ${safe.lastName}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          ${safe.phone ? `<p><strong>Phone:</strong> ${safe.phone}</p>` : ""}
          <p><strong>Category:</strong> ${safe.category}</p>
          <p><strong>Message:</strong></p>
          <p>${safe.message}</p>
        `,
      },
      { idempotencyKey }
    );

    if (error) {
      const statusCode = error.statusCode ?? 500;
      console.error("[contact] Resend delivery failed", {
        name: error.name,
        statusCode,
        message: error.message,
      });
      const retryable = statusCode === 429 || statusCode >= 500;
      return NextResponse.json(
        {
          error: retryable
            ? "The mail service is busy. Please try again shortly."
            : "Your message could not be delivered. Please try again later.",
        },
        { status: retryable ? 503 : 502 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id ?? null });
  } catch (error) {
    console.error("[contact] Unexpected send failure", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json(
      { error: "Your message could not be sent. Please try again later." },
      { status: 502 }
    );
  }
}
