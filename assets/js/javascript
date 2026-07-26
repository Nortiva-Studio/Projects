/* ==========================================================================
   NORTIVA JOURNAL — Script (versão simplificada)
   Único comportamento: um fade-in sutil quando cada publicação entra na tela.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((item) => observer.observe(item));
});
