'use strict';

const nodemailer = require('nodemailer');
const { env } = require('../config/env');

let cachedTransport = null;

function getTransport() {
  if (cachedTransport) return cachedTransport;
  if (!env.SMTP_HOST) {
    cachedTransport = {
      kind: 'console',
      sendMail: async (opts) => {
        // eslint-disable-next-line no-console
        console.log('\n📧 [DEV email — SMTP not configured]\n', {
          to: opts.to,
          subject: opts.subject,
          text: opts.text,
        });
        return { messageId: 'dev-' + Date.now() };
      },
    };
    return cachedTransport;
  }
  cachedTransport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
  });
  return cachedTransport;
}

async function sendEmail({ to, subject, text, html }) {
  const transport = getTransport();
  return transport.sendMail({
    from: env.MAIL_FROM,
    to: to || env.MAIL_TO,
    subject,
    text,
    html,
  });
}

function bookingEmailTemplate(booking, car) {
  const carLabel = car ? `${car.name} (${car.slug})` : `Car #${booking.carId}`;
  const text = [
    `New booking request — ${booking.fullName}`,
    `Car: ${carLabel}`,
    `Pickup: ${booking.pickupLocation} @ ${booking.pickupAt}`,
    `Return: ${booking.returnLocation} @ ${booking.returnAt}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email}`,
    booking.message ? `Message: ${booking.message}` : '',
  ]
    .filter(Boolean)
    .join('\n');
  const html = `
    <h2 style="font-family:Georgia,serif">New Booking Request</h2>
    <p><b>${booking.fullName}</b> &lt;${booking.email}&gt; · ${booking.phone}</p>
    <p><b>Car:</b> ${carLabel}</p>
    <p><b>Pickup:</b> ${booking.pickupLocation} — ${booking.pickupAt}</p>
    <p><b>Return:</b> ${booking.returnLocation} — ${booking.returnAt}</p>
    ${booking.message ? `<p><b>Message:</b> ${booking.message}</p>` : ''}
  `;
  return { subject: `Velocity · New booking from ${booking.fullName}`, text, html };
}

module.exports = { sendEmail, bookingEmailTemplate };
