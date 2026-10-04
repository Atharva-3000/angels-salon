// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Set current year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Initialize Animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // NOTE: The header is intentionally NOT animated. Animating a sticky,
  // translucent header caused it to slide down, jump back up and render blurry.

  if (!reduceMotion) {
    // Hero Section Animations (content only, runs once on load)
    gsap.from(".hero-anim", {
      y: 30,
      opacity: 0,
      duration: 1.1,
      stagger: 0.1,
      delay: 0.15,
      ease: "power3.out",
      clearProps: "transform,opacity" // remove leftover transforms so text stays crisp
    });

    // Fade up elements on scroll
    gsap.utils.toArray('.fade-up, .split-heading > *, .feature-card, .service-item, .review-grid article').forEach(el => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true
        }
      });
    });
  }

  // Smooth scroll for anchor links (offset for sticky header)
  const header = document.querySelector('.site-header');
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = targetId === '#top' ? 0 : header.offsetHeight;
      const y = targetId === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  // Header border/shadow on scroll
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});
