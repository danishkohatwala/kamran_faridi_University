/* ============================================================
   Kamran Faridi University — Interactive Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---- Mobile nav toggle ---- */
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });

  /* ---- Active nav highlight on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');
  const highlightNav = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.navbar__link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ---- Scroll-triggered animations ---- */
  const animEls = document.querySelectorAll('[data-anim]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  animEls.forEach(el => observer.observe(el));

  /* ---- Counter animation ---- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const startTime = performance.now();

        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out quad
          const eased = 1 - (1 - progress) * (1 - progress);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target;
          }
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---- Particle effect in hero ---- */
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    const count = 30;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      const size = Math.random() * 3 + 1;
      dot.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        background: rgba(212, 168, 67, ${Math.random() * 0.3 + 0.05});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particle-float ${Math.random() * 6 + 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * -4}s;
      `;
      particleContainer.appendChild(dot);
    }

    // Inject particle keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particle-float {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
        25% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random()*30+10}px, -${Math.random()*30+10}px) scale(1.2); opacity: 1; }
        50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random()*20+5}px, ${Math.random()*20+5}px) scale(0.8); opacity: 0.3; }
        75% { transform: translate(${Math.random() > 0.5 ? '-' : ''}${Math.random()*25+10}px, -${Math.random()*15+5}px) scale(1.1); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ---- Contact form ---- */
  const form = document.getElementById('contact-form');
  const modal = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalCourse = document.getElementById('modal-course');

  const openModal = (courseName) => {
    modalCourse.textContent = courseName || 'our courses';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const course = document.getElementById('form-course').value;
    openModal(course);
    form.reset();
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---- Course "Enrol Now" buttons ---- */
  document.querySelectorAll('.course-card__enrol').forEach(btn => {
    btn.addEventListener('click', () => {
      const courseName = btn.dataset.course;
      // Scroll to contact, pre-select course
      const courseSelect = document.getElementById('form-course');
      courseSelect.value = courseName;
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      // Flash the form
      setTimeout(() => {
        const formEl = document.querySelector('.contact__form');
        formEl.style.boxShadow = '0 0 0 3px rgba(212, 168, 67, 0.3)';
        setTimeout(() => { formEl.style.boxShadow = ''; }, 1500);
      }, 600);
    });
  });
});
