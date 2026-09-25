const json = (body, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store' },
});

function clean(value, maxLength) {
  return typeof value === 'string' && value.trim().length <= maxLength
    ? value.trim()
    : null;
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
    if (!request.headers.get('content-type')?.startsWith('application/json')) {
      return json({ error: 'Expected JSON.' }, 415);
    }

    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) {
      return json({ error: 'Origin not allowed.' }, 403);
    }

    let data;
    try {
      const body = await request.text();
      if (body.length > 10000) return json({ error: 'Message too large.' }, 413);
      data = JSON.parse(body);
    } catch {
      return json({ error: 'Invalid request.' }, 400);
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return json({ error: 'Invalid request.' }, 400);
    }
    if (data.website) return json({ ok: true }); // Hidden spam trap.

    const name = clean(data.name, 100);
    const phone = clean(data.phone, 50);
    const email = clean(data.email, 254);
    const message = clean(data.message, 3000);

    if (!name || !phone || !email || !message || /[\r\n]/.test(name) || /[\r\n]/.test(phone) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Please complete all fields with a valid email address.' }, 400);
    }

    const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
    if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
      return json({ error: 'Email is temporarily unavailable.' }, 503);
    }

    try {
      const sent = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL,
          to: [CONTACT_TO_EMAIL],
          reply_to: email,
          subject: `New Hair Flash Studio enquiry from ${name}`,
          text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (!sent.ok) {
        console.error('Contact email provider returned status', sent.status);
        return json({ error: 'Message could not be sent. Please call the salon.' }, 502);
      }
      return json({ ok: true });
    } catch {
      console.error('Contact email provider request failed');
      return json({ error: 'Message could not be sent. Please call the salon.' }, 502);
    }
  },
};
