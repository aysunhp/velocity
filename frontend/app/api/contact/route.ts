import { z } from 'zod';
import { contactEmail, sendEmail } from '@/lib/server/mailer';
import { created, fail } from '@/lib/server/response';

const contactBody = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  subject: z.string().trim().min(2).max(140),
  message: z.string().trim().min(5).max(2000),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return fail(400, 'Invalid JSON body');
  }

  const parsed = contactBody.safeParse(payload);
  if (!parsed.success) {
    return fail(422, 'Validation failed', parsed.error.flatten().fieldErrors);
  }

  const delivered = await sendEmail(contactEmail(parsed.data));
  if (!delivered) {
    // The message is in the function log, but telling the visitor it was sent
    // would be a lie — they'd never get a reply.
    return fail(502, 'Message could not be delivered. Please call or use WhatsApp.');
  }

  return created({ delivered: true });
}
