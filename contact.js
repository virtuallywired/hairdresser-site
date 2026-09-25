document.getElementById('contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Hair Flash Studio enquiry from ${data.get('name')}`;
  const body = `Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
  window.location.href = `mailto:hairflash@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
