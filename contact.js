const form = document.getElementById('contact-form');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const button = form.querySelector('button[type="submit"]');
  const status = document.getElementById('form-status');
  const data = Object.fromEntries(new FormData(form));

  button.disabled = true;
  button.textContent = 'Sending…';
  status.textContent = '';
  status.className = 'form-status';

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('The message could not be sent.');
    form.reset();
    status.textContent = 'Thanks — your message has been sent. We’ll be in touch soon.';
    status.classList.add('success');
  } catch {
    status.textContent = 'Sorry, your message was not sent. Please call us on 02 9319 2288.';
    status.classList.add('error');
  } finally {
    button.disabled = false;
    button.textContent = 'Send enquiry';
  }
});
