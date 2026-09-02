// One-time hero reveal on load — a single orchestrated moment, not per-section scroll effects.
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(8px)';
    hero.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
      });
    });
  }

  // Click an email address to copy it, with a short inline confirmation.
  // Falls through to the default mailto: link if clipboard access fails.
  document.querySelectorAll('.copy-email').forEach((link) => {
    link.addEventListener('click', (event) => {
      const email = link.dataset.email;
      if (!navigator.clipboard || !email) return; // let mailto: handle it

      event.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        const original = link.textContent;
        link.textContent = 'Copied — ' + email;
        setTimeout(() => {
          link.textContent = original;
        }, 1600);
      }).catch(() => {
        window.location.href = 'mailto:' + email;
      });
    });
  });
});
