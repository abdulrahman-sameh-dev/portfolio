import { Resend } from 'resend';
import { NextResponse } from 'next/server';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server is not configured to send messages.' },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { firstName, lastName, email, category, message } = await req.json();

    const safe = {
      firstName: escapeHtml(String(firstName ?? "")),
      lastName: escapeHtml(String(lastName ?? "")),
      email: escapeHtml(String(email ?? "")),
      category: escapeHtml(String(category ?? "")),
      message: escapeHtml(String(message ?? "")),
    };

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // لما تربط دومينك غير ده
      to: ['abdulrahman.sameh.giza.eg@gmail.com'], // حط إيميلك الشخصي هنا اللي عايز تستقبل عليه
      subject: `New Inquiry: ${safe.category} from ${safe.firstName} ${safe.lastName}`,
      replyTo: safe.email,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${safe.firstName} ${safe.lastName}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Category:</strong> ${safe.category}</p>
        <p><strong>Message:</strong></p>
        <p>${safe.message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
