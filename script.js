/* ============================================
   YPO SF Bay — Landing Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll behavior ---
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // --- Scroll-based fade-in animations ---
  const animatedElements = document.querySelectorAll(
    '.value-card, .benefit-card, .event-card, .testimonial-card, ' +
    '.about-text, .join-text, .join-form-wrapper, .section-header'
  );

  animatedElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Form handling ---
  const form = document.getElementById('join-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validate required fields
    if (!data.name || !data.email || !data.company || !data.role) {
      return;
    }

    // Show success state
    const wrapper = form.closest('.join-form-wrapper');
    wrapper.innerHTML = `
      <div style="text-align: center; padding: 2rem 0;">
        <svg viewBox="0 0 24 24" fill="none" stroke="#b8860b" stroke-width="2" width="48" height="48" style="margin: 0 auto 1rem;">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <h3 style="font-size: 1.35rem; color: #1a2744; margin-bottom: 0.5rem;">Thank You, ${data.name}!</h3>
        <p style="color: #5a6a7a; font-size: 0.95rem; max-width: 320px; margin: 0 auto;">
          We've received your interest. A member of our chapter team will be in touch soon.
        </p>
      </div>
    `;
  });

  // --- Stat counter animation ---
  const stats = document.querySelectorAll('.stat-number');
  let statAnimated = false;

  function animateStats() {
    if (statAnimated) return;

    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    if (rect.top > window.innerHeight) return;

    statAnimated = true;

    stats.forEach(stat => {
      const text = stat.textContent;
      const match = text.match(/^([\d,]+)(\+?)$/);
      if (!match) return;

      const target = parseInt(match[1].replace(/,/g, ''), 10);
      const suffix = match[2];
      const duration = 1500;
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        stat.textContent = current.toLocaleString() + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    });
  }

  window.addEventListener('scroll', animateStats, { passive: true });
  animateStats(); // Run on load too (hero is visible immediately)
});
