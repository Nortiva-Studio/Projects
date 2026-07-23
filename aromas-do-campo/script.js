/* ================================================================
   NORTIVA STUDIO — TEMPLATE DE CASE STUDY
   JavaScript puro, sem dependências. Cada bloco é independente
   e pode ser reaproveitado em outros projetos.
================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initScrollReveal();
  initHeroGlow();
  initSmoothAnchors();
  initFooterYear();
});

/* ---------- 1. Header: fica "sólido" ao rolar a página ---------- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const toggle = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ---------- 2. Menu mobile ---------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu ao clicar em um link
  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- 3. Animações de entrada ao rolar a página ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  // Aplica o delay individual definido via data-reveal-delay
  items.forEach((el) => {
    const delay = el.getAttribute('data-reveal-delay');
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
  });

  // Sem suporte a IntersectionObserver: mostra tudo direto
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- 4. Glow do hero seguindo o cursor (desktop) ---------- */
function initHeroGlow() {
  const glow = document.getElementById('heroGlow');
  const hero = document.getElementById('hero');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!glow || !hero || prefersReducedMotion || window.matchMedia('(max-width: 900px)').matches) return;

  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.left = `${x}%`;
    glow.style.top = `${y - 30}%`;
  });
}

/* ---------- 5. Scroll suave para os links internos ---------- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 88;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ---------- 6. Ano atual no rodapé ---------- */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
