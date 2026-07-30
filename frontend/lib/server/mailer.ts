/**
 * Mail transport for the route handlers — a port of
 * `backend/src/utils/sendEmail.js`, including its behaviour when SMTP is not
 * configured: log instead of throwing, so a missing credential never turns
 * into a failed submission the visitor sees.
 *
 * Reads plain (non-NEXT_PUBLIC_) env vars, so the credentials stay server-side:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO
 */

import nodemailer, { type Transporter } from 'nodemailer';

export interface MailPayload {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

/** `true` when a real SMTP transport is configured. */
export const mailerConfigured = Boolean(process.env.SMTP_HOST);

let cached: Transporter | null = null;

function getTransport(): Transporter {
  if (cached) return cached;
  const port = Number(process.env.SMTP_PORT) || 587;
  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
  return cached;
}

/**
 * Sends `payload`, or logs it when SMTP is unconfigured.
 * Resolves `false` if delivery was attempted and failed — callers decide
 * whether that should surface to the visitor.
 */
export async function sendEmail(payload: MailPayload): Promise<boolean> {
  const to = process.env.MAIL_TO || process.env.SMTP_USER;

  if (!mailerConfigured || !to) {
    console.warn(
      '[mailer] SMTP not configured — logging instead of sending.',
      JSON.stringify({ subject: payload.subject, text: payload.text })
    );
    return false;
  }

  try {
    await getTransport().sendMail({
      from: process.env.MAIL_FROM || `Velocity <${process.env.SMTP_USER}>`,
      to,
      replyTo: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    });
    return true;
  } catch (err) {
    console.error('[mailer] send failed:', (err as Error).message);
    return false;
  }
}

// ─── Templates ─────────────────────────────────────────────────────────────

/** Escapes interpolated values so visitor input cannot inject markup. */
function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function contactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): MailPayload {
  return {
    subject: `Velocity · Contact — ${data.subject}`,
    replyTo: data.email,
    text: [
      `New contact message`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Subject: ${data.subject}`,
      ``,
      data.message,
    ].join('\n'),
    html: `
      <h2 style="font-family:Georgia,serif">New Contact Message</h2>
      <p><b>${esc(data.name)}</b> &lt;${esc(data.email)}&gt;</p>
      <p><b>Subject:</b> ${esc(data.subject)}</p>
      <p style="white-space:pre-wrap">${esc(data.message)}</p>
    `,
  };
}

export function bookingEmail(
  booking: {
    fullName: string;
    email: string;
    phone: string;
    pickupLocation: string;
    returnLocation: string;
    pickupAt: string;
    returnAt: string;
    message?: string;
    totalPrice: number;
  },
  car: { name: string; slug: string; currency: string }
): MailPayload {
  const carLabel = `${car.name} (${car.slug})`;
  const price = `${booking.totalPrice} ${car.currency}`;

  return {
    subject: `Velocity · New booking from ${booking.fullName}`,
    replyTo: booking.email,
    text: [
      `New booking request — ${booking.fullName}`,
      `Car: ${carLabel}`,
      `Total: ${price}`,
      `Pickup: ${booking.pickupLocation} @ ${booking.pickupAt}`,
      `Return: ${booking.returnLocation} @ ${booking.returnAt}`,
      `Phone: ${booking.phone}`,
      `Email: ${booking.email}`,
      booking.message ? `Message: ${booking.message}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
    html: `
      <h2 style="font-family:Georgia,serif">New Booking Request</h2>
      <p><b>${esc(booking.fullName)}</b> &lt;${esc(booking.email)}&gt; · ${esc(booking.phone)}</p>
      <p><b>Car:</b> ${esc(carLabel)}</p>
      <p><b>Total:</b> ${esc(price)}</p>
      <p><b>Pickup:</b> ${esc(booking.pickupLocation)} — ${esc(booking.pickupAt)}</p>
      <p><b>Return:</b> ${esc(booking.returnLocation)} — ${esc(booking.returnAt)}</p>
      ${booking.message ? `<p><b>Message:</b> ${esc(booking.message)}</p>` : ''}
    `,
  };
}
