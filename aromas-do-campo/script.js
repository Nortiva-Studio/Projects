  // Header com fundo ao rolar
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });

  // Menu mobile
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // Revelação suave ao rolar
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  // Pétalas flutuantes no hero
  const hero = document.querySelector('.hero');
  for (let i = 0; i < 14; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.top = -(Math.random() * 40) + 'px';
    petal.style.animationDuration = (10 + Math.random() * 10) + 's';
    petal.style.animationDelay = (Math.random() * 10) + 's';
    petal.style.opacity = 0.4 + Math.random() * 0.4;
    petal.style.transform = `scale(${0.6 + Math.random() * 0.8})`;
    hero.appendChild(petal);
  }
