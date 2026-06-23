// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile Nav Toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    const hidden = nav.getAttribute('aria-hidden') === 'false';
    nav.setAttribute('aria-hidden', String(hidden));
  });

  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
});

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');
const modalClose = document.getElementById('modal-close');
const modalOverlay = document.getElementById('modal-overlay');

const openModal = (title, desc, link) => {
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalLink.href = link;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.dataset.title || 'Project';
    const desc = card.dataset.desc || 'Project description';
    const link = card.dataset.link || '#';
    openModal(title, desc, link);
  });
});

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: target,
          ease: 'power2.inOut'
        });
      }
    }
  });
});

gsap.utils.toArray('section').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    duration: 0.6
  });
});

gsap.from('.project-card', {
  scrollTrigger: {
    trigger: '.project-grid',
    start: 'top 70%',
    toggleActions: 'play none none none'
  },
  y: 30,
  opacity: 0,
  stagger: 0.1,
  duration: 0.8,
  ease: 'power2.out'
});

gsap.to('.floating-card', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    markers: false
  },
  y: 100,
  duration: 1
});

document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    gsap.to(this, {
      duration: 0.3,
      scale: 1.1,
      ease: 'back.out'
    });
  });
  tag.addEventListener('mouseleave', function() {
    gsap.to(this, {
      duration: 0.3,
      scale: 1,
      ease: 'back.out'
    });
  });
});

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    console.log('Portfolio loaded and optimized');
  });
}